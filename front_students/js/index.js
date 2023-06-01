//Carga las funciones y demas una vez se a cargado completamente el HTML

$(document).ready(start = () => {

    //Trae los estudiantes en la base de datos

    $.ajax({
        method:'get',
        url:'http://localhost:8000/estudiantes'
    }).done((response) => {
        const dataJson = JSON.parse(response);
        const students = dataJson.data;
        let iHtml ='';

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

});