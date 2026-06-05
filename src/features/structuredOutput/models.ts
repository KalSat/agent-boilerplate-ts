import { z } from 'zod'

export const movieSchema = z.object({
  title: z.string().describe('The title of the movie'),
  year: z.number().int().describe('The year the movie was released'),
  director: z.string().describe('The director of the movie'),
  rating: z.number().describe("The movie's rating out of 10"),
})

export type Movie = z.infer<typeof movieSchema>
