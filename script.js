let cube = document.querySelector('.cube');
let rangeY = document.querySelector('.Y');
let rangeX = document.querySelector('.X');

let degs = document.querySelector('.degs');

cube.style.transform = 'rotateX(-20deg) rotateY(-10deg)';

let XY = cube.style.transform.split('(');
XY = XY.join().split(')');
XY = XY.join().split('d');
XY = XY.join().split(',');

degs.innerHTML = `X: ${XY[1]} Y: ${XY[4]}`;

rangeY.addEventListener('input', (e) => {
    cube.style.transform = `rotateX(${rangeX.value}deg) rotateY(${e.target.value}deg)`;
    degs.innerHTML = `X: ${rangeX.value} | Y: ${e.target.value}`;
});
rangeX.addEventListener('input', (e) => {
    cube.style.transform = `rotateX(${e.target.value}deg) rotateY(${rangeY.value}deg)`;
    degs.innerHTML = `X: ${e.target.value} | Y: ${rangeY.value}`;
});

cube.addEventListener('mousedown', rotate3D);

function rotate3D(e) {
    cube.style.cursor = 'grabbing';
    document.querySelector('body').style.cursor = 'grabbing';

    let initialX = e.pageX;
    let initialY = e.pageY;

    let lastMouseY;
    let lastMouseX;
    window.addEventListener('mousemove', rotate);
    
    
    function rotate(e) {
        let actualMouseX = e.pageX;
        let actualMouseY = e.pageY;

        let XY = cube.style.transform.split('(');
        XY = XY.join().split(')');
        XY = XY.join().split('d');
        XY = XY.join().split(',');

        let initialRotateX = parseInt(XY[1]);
        let initialRotateY = parseInt(XY[4]);

        let Y = e.pageY - initialY;
        Y = Y >= 0 ? -Math.abs(Y) : Math.abs(Y)

        Y = lastMouseY < actualMouseY ? 
            initialRotateX - (actualMouseY - lastMouseY) : 
            initialRotateX + (lastMouseY - actualMouseY);

        let X = e.pageX - initialY;
        X = lastMouseX < actualMouseX ?
            initialRotateY + (actualMouseX - lastMouseX) : 
            initialRotateY - (lastMouseX - actualMouseX);

        cube.style.transform = `rotateX(${Y}deg) rotateY(${X}deg)`;

        degs.innerHTML = `X: ${X} Y: ${Y}`;

        lastMouseY = e.pageY;
        lastMouseX = e.pageX;
        
    }

    window.addEventListener('mouseup', ()=>{
        window.removeEventListener('mousemove', rotate);
        document.querySelector('body').style.cursor = 'default';
        cube.style.cursor = 'grab';
    });
    
}

 // entendendo o cubo 

let front = document.querySelector('.face--front');
let back = document.querySelector('.face--back');
let Top = document.querySelector('.face--top');
let bottom = document.querySelector('.face--bottom');
let right = document.querySelector('.face--right');
let left = document.querySelector('.face--left');

function comprimento(comprimento) {
    originalWidth = front.offsetWidth - 4;
    originalTranslate = 50
    atualWidth = comprimento;

    right.style.width = `${comprimento}px` ;

    let rz = (comprimento / 2) - (front.offsetWidth - 4);
    rz = rz >= 0 ? -Math.abs(rz) : Math.abs(rz);
    right.style.transform = `rotateY(90deg) translateZ(${rz}px)`;

    left.style.width = `${comprimento}px`;
    left.style.transform = `rotateY(-90deg) translateZ(${comprimento / 2}px)`;

    front.style.transform = `translateZ(${comprimento / 2}px)`;
    back.style.transform = `rotateY(180deg) translateZ(${comprimento / 2}px)`;

    Top.style.height = `${comprimento}px`;
    Top.style.transform = `rotateX(90deg) translateZ(${comprimento / 2}px)`;

    bottom.style.height = `${comprimento}px`;

    let z = (comprimento / 2) - (front.offsetHeight - 4);
    z = z >= 0 ? -Math.abs(z) : Math.abs(z);
    bottom.style.transform = `rotateX(-90deg) translateZ(${z}px)`;

    cube.style.height = `${front.offsetHeight}px`;
    cube.style.width = `${front.offsetWidth}px`;

}

function largura(largura) {
    front.style.width = `${largura}px`;
    back.style.width = `${largura}px`;

    Top.style.width = `${largura}px`;
    bottom.style.width = `${largura}px`;

    let rz = (right.offsetWidth / 2) - (largura + 2);
    rz = rz >= 0 ? -Math.abs(rz) : Math.abs(rz)

    right.style.transform = `rotateY(90deg) translateZ(${rz}px)`;

    cube.style.width = `${largura}px`;
    cube.style.height = `${front.style.offsetHeight}px`;
}

function espessura(espessura) {
    front.style.height = `${espessura}px`;
    back.style.height = `${espessura}px`;
    right.style.height = `${espessura}px`;
    left.style.height = `${espessura}px`;

    let z = (bottom.offsetHeight / 2) - (espessura)
    z = z >= 0 ? -Math.abs(z) : Math.abs(z);
    bottom.style.transform = `rotateX(-90deg) translateZ(${z}px)`;

    cube.style.height = `${espessura}px`;
    cube.style.width = `${front.offsetWidth}px`
}