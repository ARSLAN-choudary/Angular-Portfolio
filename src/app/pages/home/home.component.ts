import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { NavbarComponent } from "../navbar/navbar.component";
import emailjs from 'emailjs-com';
import {FormsModule, NgForm} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxTypedWriterModule, NavbarComponent, FormsModule, RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  currentIndex: number = 0;
  totalSlides: number = 5; // Total number of slides
  autoSlideInterval: any; // To store interval reference

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.setActiveSlide(this.currentIndex);
    this.autoSlide(); // Call autoSlide method on initialization
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.animateSkills);
    }
  }

  // Method to set active slide and description
  setActiveSlide(index: number): void {
    const slides = document.querySelectorAll('[data-carousel-item]');
    const descriptions = document.querySelectorAll('[data-carousel-item-description]');

    slides.forEach((slide, i) => {
      (slide as HTMLElement).style.display = i === index ? 'block' : 'none';
    });
    descriptions.forEach((desc, i) => {
      (desc as HTMLElement).style.display = i === index ? 'block' : 'none';
    });
  }

  // Method to go to the next slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.setActiveSlide(this.currentIndex);
  }

  // Method to go to the previous slide
  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.setActiveSlide(this.currentIndex);
  }

  // Method for auto sliding
  autoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide(); // Automatically move to the next slide
    }, 4000); // Change slides every 3 seconds
  }

  // Optional: Method to stop auto sliding
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval); // Stop the interval
    }
  }




  animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillsBars = document.querySelectorAll('.skill-progress');

    const sectionPosition = skillsSection?.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (sectionPosition && sectionPosition < screenPosition) {
      skillsBars.forEach((bar) => {
        const percent = bar.getAttribute('data-percent');
        (bar as HTMLElement).style.width = `${percent}%`;
      });
    }
  }

  isOpen: boolean[] = [false, false, false, false, false];
  toggle(index: number): void {
    // Close all other items
    this.isOpen = this.isOpen.map((_, i) => i === index ? !this.isOpen[i] : false);
  }


  

  name: string = '';
  email: string = '';
  message: string = '';

  sendEmail(form: NgForm) {
    if (form.valid) {
      const templateParams = {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message
      };
     

      emailjs.send('service_b70fq7o', 'template_gar76yp', templateParams, 'T4IVeiG_NuN1_P4Jc')
        .then((response) => {
          console.log('Email sent successfully', response);
          form.reset(); // Reset form after successful submission
          // Optionally show a success message
        }, (error) => {
          console.error('Error sending email', error);
          // Optionally show an error message
        });
    }
  }


  emailSent = false;

  openmodal(){
    this.emailSent=!this.emailSent
  }
  closeNotification() {
    this.emailSent = false;
  }

}
