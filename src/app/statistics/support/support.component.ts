import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

interface SupportElement {
  title: string;
  description: string;
  shortSummary: string;
  image: string;
  smallImage?: string;
  link: string;
}
const SUPPORT_ELEMENTS: Array<SupportElement> = [
  {
    title: $localize`Armed Forces of Ukraine`,
    shortSummary: $localize`Government, Military`,
    description: $localize`An official fundraising account created by NBU to support the Armed Forces of Ukraine. All collected funds are directed to enhance Ukraine's defense capability: weapons, equipment, food, medicine, and other supplies.`,
    image: 'assets/img/support/mod_logo.png',
    smallImage: 'assets/img/ukraine_flag.png',
    link: `https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi`,
  },
  {
    title: $localize`Come Back Alive`,
    shortSummary: $localize`Military, Non-government, Medical`,

    description: $localize`The Foundation stands with the Ukrainian Armed Forces by funding defensive initiatives. We supply technology, training, and ammunition. After arriving home from the front line of defense, our troops receive support with sports rehabilitation and the development of veteran-run businesses.`,
    image: 'assets/img/support/come_back_alive_logo.png',
    smallImage: 'assets/img/ukraine_flag.png',
    link: 'https://savelife.in.ua/donate/',
  },
  {
    title: $localize`UNITED24`,
    shortSummary: $localize`Government, Military, Medical, Humanitarian, Education and Science`,
    description: $localize`The platform allows one-click donations to Ukraine from anywhere. Why is this so important? Because Ukraine itself knows best what is needed and can deliver aid directly.

    No one was ready for a full-scale war in the heart of Europe. Charitable foundations, no matter how well-organized, cannot meet the needs of a country as large as Ukraine. We can, however, do it together.

    UNITED24 is designed for collaboration with charities, partners, donors, and public figures worldwide.`,
    image: 'assets/img/support/united_24_logo.png',
    smallImage: 'assets/img/ukraine_flag.png',
    link: 'https://u24.gov.ua/',
  },
  {
    title: $localize`The Ukraine Humanitarian Fund`,
    shortSummary: $localize`Non-government, Humanitarian, Medical`,
    description: $localize`One of the UN's country-based pooled funds. Your donation will help humanitarian NGOs and UN agencies in Ukraine to assist the most vulnerable communities and people, and to provide them with urgently needed food, water, shelter, and other basic support.`,
    image: 'assets/img/un_logo_big.png',
    smallImage: 'assets/img/un_logo.png',
    link: 'https://crisisrelief.un.org/t/ukraine',
  },
  {
    title: $localize`Serhiy Prytula Charity Foundation`,
    shortSummary: $localize`Military, Non-government, Medical`,
    description: $localize`Serhiy Prytula Charity Foundation is focused on strengthening the Defence Forces of Ukraine and providing assistance to the civilians affected by russian aggression.
    Over 200 volunteers and employees of the Foundation work every day to ensure that every donation we receive becomes valuable assistance to Ukraine.`,
    image: 'assets/img/support/sergii_prutyla_foundation_logo.png',
    smallImage: 'assets/img/ukraine_flag.png',
    link: 'https://prytulafoundation.org/en',
  },
  {
    title: $localize`Ministry of Healthcare of Ukraine`,
    shortSummary: $localize`Government, Humanitarian, Medical`,
    description: $localize`All funds will be used to meet the needs of hospitals and emergency medical institutions that are the first to provide assistance to the wounded and enter the struggle for the life and health of Ukrainians.`,
    image: 'assets/img/support/moh_logo.png',
    smallImage: 'assets/img/ukraine_flag.png',
    link: 'https://moz.gov.ua/article/news/moz-ta-chervonij-hrest-vidkrivajut-rahunok-dlja-dopomogi-medikam',
  },
];

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent {
  public donateOptions: Array<SupportElement> = SUPPORT_ELEMENTS;
}
