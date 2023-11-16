import '@testing-library/jest-dom';


test('test render NavMenu', () => {
    const navMenuElement = document.createElement('NavMenu');
    
    expect(navMenuElement).not.toBeNull();
    expect(navMenuElement).toBeEmptyDOMElement();
    
  });

  test('test render CardProduct',()=>{
    const cardProductElement=document.createElement('CardProduct');

    expect(cardProductElement).toHaveClass('cardProduct');
  })

