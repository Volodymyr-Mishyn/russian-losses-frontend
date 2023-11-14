import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NavigationElement } from '../../_models/navigation-element';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-list',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-list.component.html',
  styleUrl: './navigation-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListComponent {
  @Input() list!: Array<NavigationElement>;
}
