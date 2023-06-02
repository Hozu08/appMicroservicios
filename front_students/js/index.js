//Carga las funciones y demas una vez se a cargado completamente el HTML

let addStudent = () => {};
let start = () => {};
let modifyW = () => {};

$(document).ready(start = () => {

    //Trae los estudiantes en la base de datos

    $.ajax({
        method:'get',
        url:'http://localhost:8000/estudiantes'
    }).done((response) => {
        const dataJson = JSON.parse(response);
        const students = dataJson.data;
        let iHtml = '';

        students.forEach(student => {
            iHtml += '<tr>';
            iHtml +=    '<td>' + student.codigo + '</td>';
            iHtml +=    '<td>' + student.nombres + '</td>';
            iHtml +=    '<td>' + student.apellidos + '</td>';
            iHtml +=    '<td><button onclick="scoreW(' + student.codigo + ')" type="button">Notas</button></td>';
            iHtml +=    '<td><button onclick="modifyW(' + student.codigo + ')" type="button">Modificar</button></td>';
            iHtml +=    '<td><button onclick="deleteW(' + student.codigo + ')" type="button">Eliminar</button></td>';
            iHtml += '</tr>';
        });

        $('#containerST').append(iHtml);

    }).fail((error) => {
        console.error(error);
    });

    /*Permite ocultar o mostrar las ventanas de tabla estudiantes o agregar/modificar 
    estudiante, ademas asigna el titulo y nombre de boton*/

    $('#agregarEBtn').click(() => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');
        $('#title').text('Agregar estudiante');
        $('#acceptMA').text('Agregar');
    });


    $('#closeMABtn').click(() => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:hidden');
        document.getElementById('containerMain').setAttribute('style', 'visibility:visible');
    });

    $('#acceptMA').click(() => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:hidden');
        document.getElementById('containerMain').setAttribute('style', 'visibility:visible');
        start();
    });

    //Agregar estudiante

    $('#acceptMA').click(addStudent = () => {
        $code = $('#codeMA').val();
        $name = $('#nameMA').val();
        $lastname = $('#lastnameMA').val();    
        $.ajax({
            url: 'http://localhost:8000/estudiante',
            method: 'post',
            data:{
                codigo: $code,
                nombres: $name,
                apellidos: $lastname
            }
        }).done(response=>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data; 
            alert(msg);
        })
    });    

    //Modificar estudiante

    modifyW = ($code) => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');
        $('#title').text('Modificar estudiante');
        $('#acceptMA').text('Modificar');

        $('#acceptMA').click(() => {
            $codeM = $('#codeMA').val();
            $name = $('#nameMA').val();
            $lastname = $('#lastnameMA').val();
            $.ajax({
                url: 'http://localhost:8000/estudiante/' + $code,
                method: 'put',
                data:{
                    codigo: $codeM,
                    nombres: $name,
                    apellidos: $lastname
                }
            }).done(response=>{
                const dataJson = JSON.parse(response);
                const msg = dataJson.data; 
            })    
        });   
    }
});