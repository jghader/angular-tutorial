import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      return await data.json();
    } catch (error) {
      console.error('Error fetching housing locations:', error);
      return [];
    }
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    try {
      const response = await fetch(`http://localhost:3000/locations`);

      if (!response.ok) {
        console.error(
          `Failed to fetch data from http://localhost:3000/locations`
        );
        return undefined;
      }

      const data = await response.json();
      const location = data.find((item: HousingLocation) => item.id === id);

      if (!location) {
        console.error(`Data not found for ID ${id}`);
        return undefined;
      }

      return location;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      return undefined;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
