import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YelloChat } from '../models/yello-chat';

@Injectable({
  providedIn: 'root',
})
export class YelloChatService {
  api_URL = 'https://us-central1-yellochat-12b69.cloudfunctions.net/';

  constructor(private http: HttpClient) {}

  getData(): Observable<YelloChat> {
    return this.http.get<YelloChat>(`${this.api_URL}sampleTestData`);
  }
}
