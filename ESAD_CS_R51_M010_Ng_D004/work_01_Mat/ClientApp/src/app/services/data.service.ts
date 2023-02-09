import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { ImagePathResponse } from '../models/image-path-response';
import { Zoo } from '../models/zoo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getZoos(): Observable<Zoo[]> {
    return this.http.get<Zoo[]>('http://localhost:51626/api/Zoo');
  }
  getZooById(id: number): Observable<Zoo> {
    return this.http.get<Zoo>(`http://localhost:51626/api/Zoo/${id}`);
  }
  postZoo(data: Zoo): Observable<Zoo> {
    return this.http.post<Zoo>(`http://localhost:51626/api/Zoo`, data);
  }
  putZoo(data: Zoo): Observable<Zoo> {
    return this.http.put<Zoo>(`http://localhost:51626/api/Zoo/${data.zooId}`, data);
  }
  deleteZoo(id: number): Observable<Zoo> {
    return this.http.delete<Zoo>(`http://localhost:51626/api/Zoo/${id}`);
  }
  //Animal
  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>('http://localhost:51626/api/Animals');
  }
  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`http://localhost:51626/api/Animals/${id}`);
  }
  postAnimal(data: Animal): Observable<Animal> {
    return this.http.post<Animal>(`http://localhost:51626/api/Animals`, data);
  }
  putAnimal(data: Animal): Observable<Animal> {
    return this.http.put<Animal>(`http://localhost:51626/api/Animals/${data.animalId}`, data);
  }
  upload(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`http://localhost:51626/api/Animals/Uploads/${id}`, formData);
  }
  deleteAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`http://localhost:51626/api/Animals/${id}`);
  }
}
