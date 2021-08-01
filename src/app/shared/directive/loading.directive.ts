import { LoadingComponent } from './../components/loading/loading.component';
import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges, OnDestroy {

  @Input('appLoading') status: boolean = true;
  @Input('appLoadingColor') color: string = 'primary';


  componentInstance!: ComponentRef<LoadingComponent>;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes.status.currentValue) {
      this.createDOM();
    } else {
      this.removeDOM();
    }


  }

  ngOnDestroy() {
    this.componentInstance.destroy();
  }


  createDOM() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
    this.componentInstance = this.viewContainerRef.createComponent(componentFactory);
    this.componentInstance.instance.in_color = this.color;
    const loadingComponentElement = this.componentInstance.location.nativeElement;


    this.renderer.addClass(this.elRef.nativeElement, 'loading-container');
    this.renderer.appendChild(this.elRef.nativeElement, loadingComponentElement);

  }

  removeDOM() {

    this.viewContainerRef.clear();
    this.renderer.removeClass(this.elRef.nativeElement, 'loading-container');
  }


}
