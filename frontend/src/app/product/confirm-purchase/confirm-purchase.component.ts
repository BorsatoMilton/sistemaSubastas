import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VehiclesService } from '../../core/services/vehicles.service.js';
import { UsuariosService } from '../../core/services/users.service.js';
import { Compra } from '../../core/models/compra.interfaces.js';
import { FormGroup } from '@angular/forms';
import { Vehicle } from '../../core/models/vehicles.interface.js';
import { User } from '../../core/models/user.interface.js';
import { Category } from '../../core/models/categories.interface.js';

@Component({
  selector: 'app-confirm-purchase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.css'
})
export class ConfirmPurchaseComponent {

  id: string | null = null;
  destinatario: string | null = null;
  compraForm: FormGroup = new FormGroup({});
  selectedCompra: Compra | null = null;
  vehiculo: Vehicle | null = null;
  usuario: User | null = null;
  idVehiculo: string | null = null;
  categoria:Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private userService:  UsuariosService,
    private router: Router
) {
    
   }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.destinatario = params['destinatario'];
    });

      this.vehicleService.getOneVehicle(this.id!).subscribe((data) => {
      if(data === null){
        alert('Vehiculo no encontrado');
        this.router.navigate(['/']);
      }else{
        this.vehiculo = data;
      

  ;
      }
   
    });

  }

  openModal(modalId: string): void {
    console.log(this.compraForm.value);
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal(modalId: string) {
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop != null) {
      backdrop.parentNode?.removeChild(backdrop);
    }
    this.selectedCompra = null;
    this.compraForm.reset();
  }

  confirmarCompra(): void {
    console.log(this.compraForm.value);
    this.closeModal('confirmarCompra');
  }

}
