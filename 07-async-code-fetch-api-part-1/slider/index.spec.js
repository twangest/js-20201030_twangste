import Slider from "./index";

describe('slider', () => {
  let slider;
  const elementWidth = 310;

  beforeEach(()=> {
    //TODO: Здесь не разобрался как задать размеры slider.element
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 23,
        height: 15,
        left: 13,
        right: 323,
        top: 8,
        width: elementWidth,
      };
    });

    slider = new Slider();
    document.body.append(slider.element);
  });

  afterEach(() => {
    slider.destroy();
    slider = null;
  });

  it('should be rendered correctly', () => {
    expect(slider.element).toBeInTheDocument();
    expect(slider.element).toBeVisible();
  });

  it('should element has some width', () =>{
    //NOTE: Здесь не разобрался как задать размеры slider.element

    //TODO:
    // expect(slider.element).toHaveStyle({
    //   width: elementWidth
    // })
  });

  it('should be moved to the left side', () => {
    const thumb = slider.thumb;
    const down = new MouseEvent('pointerdown', {
      bubbles: true
    });

    const move = new MouseEvent('pointermove', {
      clientX: 0,
      bubbles: true
    });

    const up = new MouseEvent('pointerup', {
      clientX: 0,
      bubbles: true
    });
    thumb.dispatchEvent(down);
    thumb.dispatchEvent(move);
    thumb.dispatchEvent(up);

    expect(thumb).toHaveStyle('left: 0px;');
  });

  it('should be moved to the right side', () => {
    //NOTE:  не разобрался как задать размеры slider.element
    //TODO:
    //
    // const thumb = slider.thumb;
    // const rightEdge = slider.element.offsetWidth - thumb.offsetWidth;
    // const down = new MouseEvent('pointerdown', {
    //   bubbles: true
    // });
    //
    // const move = new MouseEvent('pointermove', {
    //   clientX: rightEdge,
    //   bubbles: true
    // });
    //
    // const up = new MouseEvent('pointerup', {
    //   clientX: rightEdge,
    //   bubbles: true
    // });
    // thumb.dispatchEvent(down);
    // thumb.dispatchEvent(move);
    // thumb.dispatchEvent(up);
    //
    // expect(thumb).toHaveStyle({
    //   left: `${rightEdge}px;`
    // });
  });

  it('should dispatch position-changed event', async () => {
    const up = new MouseEvent('pointerup', {
      clientX: 0,
      bubbles: true
    });
    const down = new MouseEvent('pointerdown', {
      bubbles: true
    });

    const checkPositionChangedEvent = event =>{
      expect(event.detail).toBeTruthy();
    };
    slider.element.addEventListener('position-changed', checkPositionChangedEvent);

    slider.thumb.dispatchEvent(down);
    slider.thumb.dispatchEvent(up);
    expect.assertions(1);
  });

  it('should have ability to be destroyed ', () =>{
    slider.destroy();
    expect(slider.element).not.toBeInTheDocument();
  });
});
