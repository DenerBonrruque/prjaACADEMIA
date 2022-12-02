import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Treino } from './treino';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  novoTreino: string = "";
  treinos: Treino[] = [];


  constructor(private storage: Storage) {
    this.iniciarBanco();
  }

  async iniciarBanco(){
    await this.storage.create();
    this.treinos = await this.storage.get('treinos') ?? [];
  }

  async adicionarTreino(){
    let treino = {nome: this.novoTreino, peso: undefined}
    this.treinos.push(treino);
    this.novoTreino = "";
    await this.storage.set('treinos', this.treinos);
    console.log(this.treinos)
  }

  async atualizarTreino(){
    await this.storage.set('treinos', this.treinos);
  }

  async apagarTreino(index = 0){
    this.treinos.splice(index, 1);
    await this.storage.set('treinos', this.treinos);
  }

}