import { AddressValidationClient } from '@googlemaps/addressvalidation';

const client = new AddressValidationClient();

/**
 * Benson Home Solutions - Gcloud Address Validation
 * Prioritizes 100% accuracy for service area validation.
 */
export async function validateAddress(addressLines: string[]) {
  const [response] = await client.validateAddress({
    address: {
      addressLines,
    },
    enableUspsCass: true,
  });

  const result = response.result;
  if (!result) return null;

  return {
    standardizedAddress: result.address?.formattedAddress,
    postalCode: result.address?.postalAddress?.postalCode,
    city: result.address?.postalAddress?.locality,
    county: result.address?.postalAddress?.administrativeArea,
    latitude: result.geocode?.location?.latitude,
    longitude: result.geocode?.location?.longitude,
    isDeliverable: result.verdict?.validationGranularity === 'PREMISE',
    addressHash: Buffer.from(result.address?.formattedAddress || '').toString(
      'base64',
    ),
  };
}
