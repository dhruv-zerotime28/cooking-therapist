import { RecipeFormDataType, recipeSchemaType } from '@/Schemas/recipes';
import {
  getPreSignedUrl,
  uploadImage,
  addRecipe,
  updateRecipe,
} from '@/actions/admin/recipes-actions';

interface IselectInputsData {
  id: string;
  name: string;
}

export const addRecipeFormSubmit = async (data: RecipeFormDataType) => {
  try {
    const files = data.recipeImages;
    if (!files || files.length === 0) return;

    const newImageUrls = await ImageHandling(files, data.name);

    delete data.recipeImages;

    const AddRecipe = await addRecipe({ ...data, images: newImageUrls });
    return AddRecipe;
  } catch (error) {
    throw error;
  }
};

export const editRecipeFormSubmit = async (
  data: RecipeFormDataType,
  oldData: recipeSchemaType
) => {
  try {
    const { recipeCategory, recipeTag, recipeImages, ...other } = data;
    const files = recipeImages;

    if (!files || files.length === 0) {
      throw 'At least One Image is needed for recipe';
    }

    const newImageUrls = await ImageHandling(files, other.name);

    const removedUrls = oldData.images.filter(
      (url) => !data.recipeImages?.includes(url)
    );

    const oldUrls = oldData.images.filter((url) => recipeImages?.includes(url));

    const removedTags = getRemovedItems(oldData.recipeTag, recipeTag);
    const removedCategory = getRemovedItems(
      oldData.recipeCategory,
      recipeCategory
    );

    const addedTags = getAddedItems(oldData.recipeTag, recipeTag);
    const addedCategory = getAddedItems(oldData.recipeCategory, recipeCategory);

    const response = await updateRecipe({
      id: oldData.id,
      oldUrls,
      newUrls: newImageUrls,
      removedUrls,
      addedTags,
      addedCategory,
      removedCategory,
      removedTags,
      ...other,
    });
    return response;
  } catch (error) {
    throw error || 'error while editing Recipe Info';
  }
};

function getRemovedItems( //provide lists of tags and categories removed
  oldData: IselectInputsData[],
  newData: IselectInputsData[]
): IselectInputsData[] {
  return oldData.filter(
    (oldItem) => !newData.some((newItem) => newItem.id === oldItem.id)
  );
}

function getAddedItems( //provides list of newly added tags and categories
  oldData: IselectInputsData[],
  newData: IselectInputsData[]
): IselectInputsData[] {
  return newData.filter(
    (newItem) => !oldData.some((oldItem) => oldItem.id === newItem.id)
  );
}

const ImageHandling = async (
  files: Array<string | File>,
  recipeName: string
) => {
  try {
    const Images = files?.filter((f): f is File => f instanceof File);

    if (Images.length === 0) return [];

    const newImageDetails = Images.map((file) => ({
      fileName: file.name,
      contentType: file.type,
      recipeName,
    }));

    let preSignedUrls = await getPreSignedUrl(newImageDetails);

    //attaching the realted files to the specific url
    const uploadData = preSignedUrls.map(
      (url: { fileName: string; url: string }) => {
        const file = Array.from(Images).find((f) => f.name === url.fileName);
        return { file, url: url.url };
      }
    );

    // upload the images to aws buckets
    await uploadImage(uploadData);

    const finalUrls = preSignedUrls.map((url: { dbUrl: string }) => {
      return url.dbUrl;
    });

    return finalUrls;
  } catch (error) {}
};
