import { z } from "zod";

export const timing = z.object({
    preptime : z.string(),
    cooktime : z.string(),
    totaltime : z.string(),
})

export const reciepeDetails = z.object({
    times : timing,
    ingredent : z.array(z.string()),
    instruction : z.array(z.string()),
    notes :  z.array(z.string()).optional()

})

export const reciepes = z.object({
   name : z.string(),
   description : z.string(),
   date : z.date(),
   img : z.array(z.string()),
   reciepedetails :reciepeDetails,
   tags : z.array(z.string()),
   category : z.array(z.string()),
   rating : z.number(),
   realatedReciepes : z.array(z.string()).optional()
})