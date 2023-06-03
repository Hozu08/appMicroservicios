let addStudent = () => {};
let start = () => {};
let modifyW = () => {};
let deleteW = () => {};

//Carga las funciones y demas una vez se a cargado completamente el HTML

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
            iHtml +=    '<tr>';
            iHtml +=        '<td>' + student.codigo + '</td>';
            iHtml +=        '<td>' + student.nombres + '</td>';
            iHtml +=        '<td>' + student.apellidos + '</td>';
            iHtml +=        '<td><button onclick="scoreW(' + student.codigo + ')" type="button">Notas</button></td>';
            iHtml +=        '<td><button onclick="modifyW(' + student.codigo + ')" type="button">Modificar</button></td>';
            iHtml +=        '<td><button onclick="deleteW(' + student.codigo + ')" type="button">Eliminar</button></td>';
            iHtml +=    '</tr>';
        });

        $('#contentT').html(iHtml);

    }).fail((error) => {
        console.error(error);
    });

    //Cierra la ventana agregar/modificar estudiante

    $('#closeMABtn').click(() => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:hidden');
        document.getElementById('containerMain').setAttribute('style', 'visibility:visible');
    });

    //Agregar estudiante

    $('#agregarEBtn').click(() => {
        document.getElementById('containerMA').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');
        $('#title').text('Agregar estudiante');
        $('#acceptMA').text('Agregar');
        $('#acceptMA').click(addStudent = () => {
            document.getElementById('containerMA').setAttribute('style', 'visibility:hidden');
            document.getElementById('containerMain').setAttribute('style', 'visibility:visible');
            
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
                start();
            })
        });    
    });

    //modificar estudiante

    modifyW = ($code) => {
        document.getElementById('codeMA').setAttribute('type', 'hidden');
        $('#codeP').html($code);
        document.getElementById('containerMA').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');
        $('#title').text('Modificar estudiante');
        $('#acceptMA').text('Modificar');
        $('#acceptMA').click(() => {
            document.getElementById('containerMA').setAttribute('style', 'visibility:hidden');
            document.getElementById('containerMain').setAttribute('style', 'visibility:visible');

            $codeM = $code;
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
                start();
            })    
        });    
    }

    //Eliminar estudiante

    deleteW = ($code) => {
        $.ajax({
            url: 'http://localhost:8000/estudiante/' + $code,
            method: 'delete',
        }).done(response=>{
            const dataJson = JSON.parse(response);
            const msg = dataJson.data; 
            start();
        });     
    }
});