import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Service for fetching permission/system status from the provided API endpoint
export class NavMenuService {
  constructor(private http: HttpClient) { }

  async fetchData(roleId: number) {
    const url = `https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/${roleId}`;
    return this.http.get<any>(url).toPromise();
  }
}
