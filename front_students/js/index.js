let addStudent = () => {};
let start = () => {};
let modifyW = () => {};
let deleteW = () => {};
let scoreW = () => {};
let addActivity = () => {};
let modifyAW = () => {};
let deleteAW = () => {};

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

    //Cierra la ventana agregar/modificar actividad

    $('#closeS').click(() => {
        document.getElementById('containerS').setAttribute('style', 'visibility:hidden');
        document.getElementById('containerMain').setAttribute('style', 'visibility:visible');
    });

    $('#closeAMABtn').click(() => {
        document.getElementById('containerS').setAttribute('style', 'visibility:visible');
        document.getElementById('containerAMA').setAttribute('style', 'visibility:hidden');
    });

    //Agregar estudiante

    $('#agregarEBtn').click(() => {
        $('#codeMA').val('');
        $('#nameMA').val('');
        $('#lastnameMA').val('');
        $('#codeP').html('');
        document.getElementById('codeMA').setAttribute('type', 'number');
        document.getElementById('containerMA').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');
        $('#titleMA').text('Agregar estudiante');
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
                alert(msg);
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
        $('#titleMA').text('Modificar estudiante');
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
                alert(msg);
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
            alert(msg);
            start();
        });     
    }

    //Tabla de actividades

    scoreW = ($code) => {
        document.getElementById('containerS').setAttribute('style', 'visibility:visible');
        document.getElementById('containerMain').setAttribute('style', 'visibility:hidden');

        $.ajax({
            method:'get',
            url:'http://localhost:8000/estudiante/' + $code
        }).done((response) => {
            const dataJson = JSON.parse(response);
            const student = dataJson.data;
    
            $('#codeS').html(student.codigo);
            $('#nameS').html(student.nombres);
            $('#lastnameS').html(student.apellidos);
        }).fail((error) => {
            console.error(error);
        });

        $.ajax({
            method:'get',
            url:'http://localhost:8000/actividad/' + $code
        }).done((response) => {
            const dataJson = JSON.parse(response);
            const activities = dataJson.data;
            let iHtml = '';
    
            activities.forEach(activity => {
                iHtml +=    '<tr>';
                iHtml +=        '<td>' + activity.descripcion + '</td>';
                iHtml +=        '<td>' + activity.nota + '</td>';
                iHtml +=        '<td><button onclick="modifyAW(' + activity.id + ')" type="button">Modificar</button></td>';
                iHtml +=        '<td><button onclick="deleteAW(' + activity.id + ')" type="button">Eliminar</button></td>';
                iHtml +=    '</tr>';
            });
    
            $('#contentAT').html(iHtml);
    
        }).fail((error) => {
            console.error(error);
        });
        
        //Agregar actividad

        $('#agregarABtn').click(() => {
            $('#descritionA').val('');
            $('#scoreA').val('');
            document.getElementById('containerAMA').setAttribute('style', 'visibility:visible');
            document.getElementById('containerS').setAttribute('style', 'visibility:hidden');
            $('#titleAMA').text('Agregar actividad');
            $('#acceptAMA').text('Agregar');
            $('#acceptAMA').click(addActivity = () => {
                document.getElementById('containerAMA').setAttribute('style', 'visibility:hidden');
                document.getElementById('containerS').setAttribute('style', 'visibility:visible');
                
                $descripcion = $('#descriptionA').val();
                $nota = $('#scoreA').val();
                $.ajax({
                    url: 'http://localhost:8000/actividad',
                    method: 'post',
                    data:{
                        descripcion: $descripcion,
                        nota: $nota,
                        codigoEstudiante: $code
                    }
                }).done(response=>{
                    const dataJson = JSON.parse(response);
                    const msg = dataJson.data; 
                    alert(msg);
                })
            });        
        });      

    //Modificar actividad

        modifyAW = ($id) => {
            document.getElementById('containerAMA').setAttribute('style', 'visibility:visible');
            document.getElementById('containerS').setAttribute('style', 'visibility:hidden');
            $('#titleAMA').text('Modificar actividad');
            $('#acceptAMA').text('Modificar');
            $('#acceptAMA').click(addActivity = () => {
                document.getElementById('containerAMA').setAttribute('style', 'visibility:hidden');
                document.getElementById('containerS').setAttribute('style', 'visibility:visible');
                
                $descripcion = $('#descriptionA').val();
                $nota = $('#scoreA').val();
                $.ajax({
                    url: 'http://localhost:8000/actividad/' + $id,
                    method: 'put',
                    data:{
                        descripcion: $descripcion,
                        nota: $nota,
                    }
                }).done(response=>{
                    const dataJson = JSON.parse(response);
                    const msg = dataJson.data; 
                    alert(msg);
                })
            });        
        }

        //Eliminar actividad

        deleteAW = ($id) => {
            $.ajax({
                url: 'http://localhost:8000/actividad/' + $id,
                method: 'delete',
            }).done(response=>{
                const dataJson = JSON.parse(response);
                const msg = dataJson.data; 
                alert(msg);
            });     
        }    
    }
});