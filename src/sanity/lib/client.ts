import { createClient } from 'next-sanity'

type SanityFetchError = {
  statusCode?: number
  message?: string
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const isSanityConfigured = Boolean(projectId && dataset)

export const client = createClient({
  projectId: projectId || 'disabled',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// Wrap fetch to handle cases where Sanity is not configured or fails during build
const originalFetch = client.fetch.bind(client)

client.fetch = (async function (
  query: string,
  params?: any,
  options?: any,
) {
  try {
    if (!isSanityConfigured) {
      return query.trim().startsWith('*') ? [] : null
    }
    return await originalFetch(query, params, options)
  } catch (error) {
    const sanityError = error as SanityFetchError
    const isUnauthorized =
      sanityError.statusCode === 401 || sanityError.message?.includes('Unauthorized')

    if (process.env.NODE_ENV === 'production' && isUnauthorized) {
      console.warn('[Sanity] Unauthorized fetch during build. Returning empty content.')
      return query.trim().startsWith('*') ? [] : null
    }
    throw error
  }
}) as typeof client.fetch
