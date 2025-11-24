#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID || process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.warn('ℹ️  Skipping Google review fetch. Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACES_PLACE_ID.');
  process.exit(0);
}

const fields = [
  'rating',
  'user_ratings_total',
  'reviews',
  'reviews.author_name',
  'reviews.profile_photo_url',
  'reviews.rating',
  'reviews.relative_time_description',
  'reviews.text',
  'reviews.time'
].join(',');

const endpoint = new URL('https://maps.googleapis.com/maps/api/place/details/json');
endpoint.searchParams.set('place_id', PLACE_ID);
endpoint.searchParams.set('fields', fields);
endpoint.searchParams.set('key', API_KEY);

async function main() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();

    if (payload.status !== 'OK') {
      if (payload.status === 'ZERO_RESULTS') {
        console.warn('⚠️  Google Places returned ZERO_RESULTS for the provided Place ID.');
        process.exit(0);
      }

      throw new Error(`Places API error: ${payload.status}. ${payload.error_message || ''}`);
    }

    const result = payload.result ?? {};
    const reviews = (result.reviews || []).map((review) => ({
      id: `google-${review.time}`,
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time
    }));

    const output = {
      rating: result.rating ?? null,
      user_ratings_total: result.user_ratings_total ?? null,
      reviews
    };

    const outputPath = path.join(process.cwd(), 'public', 'google-reviews.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(output, null, 2));

    console.log(`✅ Saved ${reviews.length} Google review(s) to public/google-reviews.json`);
  } catch (error) {
    console.error(`❌ Failed to fetch Google reviews: ${error.message}`);
    process.exit(0);
  }
}

main();




