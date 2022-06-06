var ide; //Variable de identificacion (txtdocumento)
var p=0;//Variable que determina si es natural o juridica (0=natural ......... 1=juridica)

var us=$("#ctl00_txtus").val(); //Capturamos el usuario que se ha logueado

   $("#rbnatural").click(function() {
        $("#txtdocumento").inputmask("99999999");
        $("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").select2("val",'1');
        p=0;
   });
  
  $("#rbjuridica").click(function() {
        $("#txtdocumento").inputmask("99999999999");
        $("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").select2("val",'6');
        p=1;
   });
  
   $("#rbrelasi").click(function() {
        $("#tipo_relacionada").removeAttr("disabled");
   });
   
   $("#rbrelano").click(function() {
        $("#tipo_relacionada").attr("disabled","disabled");
   });
   
   $("#chkretencion").click(function() {  
        if($("#chkretencion").is(':checked')) {  
            $("#fecha_retencion").removeAttr("disabled"); 
            $("#fecha_retencion").focus();
            $("#chkretencion").attr("value","S");
        } else {  
            $("#fecha_retencion").attr("disabled","disabled");
            $("#fecha_retencion").val('');
            $("#chkretencion").attr("value","N");  
        }  
    });  
    
    $("#chkpercepcion").click(function() {  
        if($("#chkpercepcion").is(':checked')) {  
            $("#fecha_percepcion").removeAttr("disabled");
            $("#fecha_percepcion").focus();  
            $("#chkpercepcion").attr("value","S");
        } else {  
            $("#fecha_percepcion").attr("disabled","disabled");
            $("#fecha_percepcion").val('');
            $("#chkpercepcion").attr("value","N");  
        }  
    });
    
 
    function GrabarPersona(){
        if (p==0){
		GrabarNatural();
		}
        if (p==1){
        GrabarJuridica();
        }
    }
    
    function BloqueVerifica(){
        $("#rbnatural").attr("disabled","disabled");
        $("#rbjuridica").attr("disabled","disabled");
        $("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").attr("disabled","disabled");
        $("#txtdocumento").attr("disabled","disabled");
        $("#btnverificar").attr("class","btn green disabled");
        $("#btnverificar").attr("href","javascript:;");
    }
    
    //Si el valor de p es 1 es juridica si es 0 se muestra natural
    function MuestraFormulario(){
        BloqueVerifica();

        $("#acciones").removeAttr("style");
        if (p==1){
            $("#juridica").removeAttr("style");
            $("#natural").attr("style","display:none;");
            $("#txtrazonsocial").focus();
            $("#txtrucjuridico").val(ide);
            $("#txtrucjuridico").attr("disabled","");
			validacionJuridica();
        }
        if (p==0){
            $("#natural").removeAttr("style");
            $("#juridica").attr("style","display:none;");
            $("#txtapepaterno").focus();
            $("#txtdninatural").val(ide);
            $("#txtdninatural").attr("disabled","");
            validacionNatural();
        } 
    }
    
    function CancelarOperacion(){
        $("#juridica").attr("style","display:none;");
        $("#natural").attr("style","display:none;");  
        $("#rbnatural").removeAttr("disabled","disabled");
        $("#rbjuridica").removeAttr("disabled","disabled");
        $("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").removeAttr("disabled","disabled");
        $("#txtdocumento").removeAttr("disabled","disabled");
        $("#btnverificar").attr("class","btn green");
        $("#btnverificar").attr("href","javascript:VerificarPersona();");
        $("#acciones").attr("style","display:none;");
        $("#txtdocumento").focus();             
    }  
    
    
    function VerificarPersona(){//Funcion que verifica si la persona existe o no
        var id=$("#txtdocumento").val();//Capturamos el valor que ingresamos en la caja de texto
        ide=id;
        Bloquear("verificar"); //LLamamos a la funcion bloquear y le enviamos la divisiona bloquear
    $.post("vistas/NP/ajax/NPMGPER.ASHX",{documento:id},  //Asignamos la ruta del controlador por metodo post y enviamos la variable documento con el valor que hemos ingresado
        function (res) { //Declaramos la funcion que contiene la respuesta de la consulta
            Desbloquear("verificar");//LLamamos a la funcion desbloquear
        if (res == 'no'){ //Preguntamos si la variable res=no significa que la persona no existe
            $('#PerNoExiste').modal('show'); //Activamos la ventama modal
            $('#pidm').html(''); //Limpiamos el contenido del div pidm
        }else{//Entramos a la parte donde la persona si existe
            $("#pidm").html(res);//Mostramos el resultado en el div pidm
            //RecuperarDatos(id);//Invocamos a la fucion que recupera los datos de la persona
        }
         }); 
   }
   
   function VerificarContacto(){//Funcion que verifica si la persona existe o no
        var id=$("#txtdnicontacto").val();//Capturamos el valor que ingresamos en la caja de texto
          Bloquear("rescontacto"); //LLamamos a la funcion bloquear y le enviamos la divisiona bloquear
    $.post("vistas/NP/ajax/NPMGPER.ASHX",{documento:id},  //Asignamos la ruta del controlador por metodo post y enviamos la variable documento con el valor que hemos ingresado
        function (res) { //Declaramos la funcion que contiene la respuesta de la consulta
            Desbloquear("rescontacto");//LLamamos a la funcion desbloquear
        if (res == 'no'){ //Preguntamos si la variable res=no significa que la persona no existe
        $("#rescontacto").attr("class","alert alert-error");
            $("#rescontacto").html("Persona No Encontrada <br> Desea Crearla?? <strong><a href='javascript:ModalCrearPersona();'>Click Aqui</a><strong>");//Mostramos el resultado en el div pidm
        }else{//Entramos a la parte donde la persona si existe
        $("#rescontacto").attr("class","alert alert-success");
            $("#rescontacto").html(res);//Mostramos el resultado en el div pidm
            //RecuperarDatos(id);//Invocamos a la fucion que recupera los datos de la persona
        }
         }); 
   }
   
   function VerificarRepresentante(){//Funcion que verifica si la persona existe o no
        var id=$("#txtdnirepresentante").val();//Capturamos el valor que ingresamos en la caja de texto
          Bloquear("resrepresentante"); //LLamamos a la funcion bloquear y le enviamos la divisiona bloquear
    $.post("vistas/NP/ajax/NPMGPER.ASHX",{documento:id},  //Asignamos la ruta del controlador por metodo post y enviamos la variable documento con el valor que hemos ingresado
        function (res) { //Declaramos la funcion que contiene la respuesta de la consulta
           Desbloquear("resrepresentante");//LLamamos a la funcion desbloquear
        if (res == 'no'){ //Preguntamos si la variable res=no significa que la persona no existe
        $("#resrepresentante").attr("class","alert alert-error");
            $("#resrepresentante").html("Persona No Encontrada <br> Desea Crearla?? <strong><a href='javascript:ModalCrearPersona();'>Click Aqui</a><strong>");//Mostramos el resultado en el div pidm
        }else{//Entramos a la parte donde la persona si existe
        $("#resrepresentante").attr("class","alert alert-success");
            $("#resrepresentante").html(res);//Mostramos el resultado en el div pidm
            //RecuperarDatos(id);//Invocamos a la fucion que recupera los datos de la persona
        }
         }); 
   }
   
  function RecuperarDatos(id) { //Funcion que recupera los datos de la persona
    $.ajax({//Invocamos el ajx del jquery
        type: "POST",//Le decimos que los datos se reciben por POST
        url: "vistas/NP/ajax/PRUEBAJSON.ASHX?id=" + id,//Indicamos el url del controlador y le enviamos el valor id
        contentType: "application/json;",//Le indicamos que el tipo de datos sera en json
        dataType: "json", //La respuesta de datos sera en json
        success: function (res) {//Declaramos una funcion a cual se activa si el proceso es correcto
         alert(res[0].CODIGO); //Mostramos el resultado en un alert ojo los datos en json se codifican con indice en es te caso obtenemos el primero [0]
        },
        error: function (msg) {//Declaramos la funcion para cuando se genere error en el proceso
                        alert(msg);//Mostramos el error en un alert
                    } });
        }
           
    $("#tipo_fono").change(function() {
    var z=$("#tipo_fono").val();
    if (z=="FIJO"){
        $(".cel").attr("style","display:none;")
        $(".fon").attr("style","display:;")
        $("#icofono").attr("class","icon-phone")
    }else{
        $(".fon").attr("style","display:none;")
        $(".cel").attr("style","display:;")
        $("#icofono").attr("class","halflings-icon phone")
    }
    });
    
   
   function GrabarNatural(){
    var apepat=$("#txtapepaterno").val();
    var apemat=$("#txtapematerno").val();
    var nombre=$("#txtnombres").val();
    var sexo=$("input:radio[name=sex]:checked").val();
    var dninat=$("#txtdninatural").val();
    var rucnat=$("#txtrucnatural").val();
    var estciv=$("#cboestadocivil").val();
    var fechanac=$("#txtfechanac").val();
    var telefono=$("#txttelefono").val();
    var email=$("#txtemail").val();
    var tipo_email=$("#tipo_email").val();
    var tipo_fono=$("#tipo_fono").val();
    var tipo_doc=$("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").val();
    Bloquear("natural");
    $.post("vistas/NP/ajax/NPMGPER.ASHX", {documento:"1", apepat:apepat ,apemat:apemat, nombre:nombre, sexo:sexo, 
    dninat:dninat, rucnat:rucnat, estciv:estciv, fechanac:fechanac, telefono:telefono, email:email,
    tipo_fono: tipo_fono, tipo_mail: tipo_email,tipo_doc:tipo_doc,usuario:us }, 
        function (res) {
        Desbloquear("natural");
        if (res != null){
            exito();
            $("#estereotipos").removeAttr("style");
            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href","javascript:ModificarPersona();");
        }else{
            noexito();
        }
         });
   }

   function GrabarJuridica(){
    var razonsocial=$("#txtrazonsocial").val();
    var nomcomercial=$("#txtnombrecomercial").val();
    var ruc=$("#txtrucjuridico").val();
    var actividad=$("#txtactividad").val();
    var representante=$("#txtdnirepresentante").val();
    var contacto=$("#txtdnicontacto").val();
    var fechaact=$("#txtinicioactividad").val();
    var dirweb=$("#txtdireccionweb").val();
    var telefono=$("#txttelefonoj").val();
    var email=$("#txtemailj").val();
    var relacionada=$("input:radio[name=rela]:checked").val();
    var tipo_rela=$("#tipo_relacionada").val();
    var tipo_doc=$("#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento").val();
    var aretencion=$("#chkretencion").val();
    var fretencion=$("#fecha_retencion").val();
    var apercepcion=$("#chkpercepcion").val();
    var fpercepcion=$("#fecha_percepcion").val();
    Bloquear("juridica");
    $.post("vistas/NP/ajax/NPMGPER.ASHX",{documento:'2',apepat:razonsocial,apemat:nomcomercial,dninat:ruc,nombre:actividad,fechanac:fechaact,telefono:telefono,
    email:email,tipo_doc:tipo_doc,estciv:representante,sexo:contacto,rucnat:dirweb,rela:relacionada,tiporel:tipo_rela,fr:fretencion,ap:apercepcion,
    fp:fpercepcion,ar:aretencion,usuario:us}, 
        function (res) {
        Desbloquear("juridica");
        if (res != null){
            exito();
            $("#estereotipos").removeAttr("style");
            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href","javascript:ModificarPersona();");
        }else{
            noexito();
        }
         });
   }


	function validacionNatural() {
			var frmPersonaNatural = $('#aspnetForm'); //aspnetForm es el formulario por defecto del ASP
			var errorNatural = $('.alert-error', frmPersonaNatural);
            var successNatural = $('.alert-success', frmPersonaNatural);
			
			frmPersonaNatural.validate({
                errorElement: 'span', //el input tien por defecto el span para mostrar el error
                errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
                focusInvalid: false, // no se muestra el foco en el elemento invalido
                ignore: "",
                rules: { //de definen las reglas para la validacion
                    txtapepaterno: {
                        required: true
                    },
					txtapematerno: {
                        required: true
                    },
					txtnombres: {
                        required: true
                    },
					txtemail: {
                        email: true
                    }
                },
				messages: { //se personaliza el mensaje para cada regla
                    txtapepaterno: {
                        required: "Ingrese Apellido Paterno"
                    },
					txtapematerno: {
                        required: "Ingrese Apellido Materno"
                    },
					txtnombres: {
                        required: "Ingrese Nombres"
                    },
					txtnemail: {
                        required: "Ingrese Email Válido"
                    }
                },
                invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                    successNatural.hide();
                    errorNatural.show();
                    App.scrollTo(errorNatural, -200);
                },

                highlight: function (element) { // error para cada input
                    $(element)
                        .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                    $(element)
                        .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
                },

                unhighlight: function (element) { // revierte el error a success
                    $(element)
                        .closest('.control-group').removeClass('error');
                },

                success: function (label) {
                    label
                        .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                    .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde
                },

                submitHandler: function (form) {
                    successNatural.show();
                    errorNatural.hide();
				}
            });
	}

	function validacionJuridica() {
			var frmPersonaNatural = $('#aspnetForm'); //aspnetForm es el formulario por defecto del ASP
			var errorNatural = $('.alert-error', frmPersonaNatural);
            var successNatural = $('.alert-success', frmPersonaNatural);
			
			frmPersonaNatural.validate({
                errorElement: 'span', //el input tien por defecto el span para mostrar el error
                errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
                focusInvalid: false, // no se muestra el foco en el elemento invalido
                ignore: "",
                rules: { //de definen las reglas para la validacion
                    txtrazonsocial: {
                        required: true
                    },
					txtnombrecomercial: {
                        required: true
                    },
					txtemailj: {
                        email: true
                    }
                },
				messages: { //se personaliza el mensaje para cada regla
                    txtrazonsocial: {
                        required: "Ingrese Razon Social"
                    },
					txtnombrecomercial: {
                        required: "Ingrese Nombre Comercial"
                    },
					txtemailj: {
                        required: "Ingrese Email Válido"
                    }
                },
                invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                    successNatural.hide();
                    errorNatural.show();
                    App.scrollTo(errorNatural, -200);
                },

                highlight: function (element) { // error para cada input
                    $(element)
                        .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                    $(element)
                        .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
                },

                unhighlight: function (element) { // revierte el error a success
                    $(element)
                        .closest('.control-group').removeClass('error');
                },

                success: function (label) {
                    label
                        .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                    .closest('.control-group').removeClass('error').addClass('success'); // quita el color rojo y lo coloca en verde
                },

                submitHandler: function (form) {
                    successNatural.show();
                    errorNatural.hide();
                }
            });
	}
	

var NPMGPER = function () {
	
	
	var datatable = function () {
		
		$('#tblBandeja').dataTable(
        {
            "iDisplayLength": 10
        }
        );
	}
	
	
	var mascaras = function () {
			$("#txtdocumento,#txtdnicontacto,#txtdnirepresentante,#txtdninatural").inputmask("99999999");
			$("#txtrucnatural,#txtrucjuridico").inputmask("99999999999");
			$("#txtfechanac,#txtinicioactividad,#fecha_retencion,#fecha_percepcion").inputmask("99/99/9999");
	}
	var calendarios = function () {
			$('#txtfechanac,#txtinicioactividad,#fecha_retencion,#fecha_percepcion').datepicker({});	
	}
	var combos = function () {
		$('#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_tipo_documento').select2({
			placeholder: "Seleccione Tipo Documento",
            allowClear: true
        });
		$('#ctl00_cph_ctl00_PCONGEN2_ctl00_dd_bancos').select2({
			placeholder: "Seleccione Banco",
            allowClear: true
        });
		$('#tipo_fono').select2({
			placeholder: "Seleccionar",
            allowClear: true
        });
		$('#tipo_relacionada').select2({
			placeholder: "Seleccionar",
            allowClear: true
        });
		$('#tipo_email').select2({
			placeholder: "Seleccionar",
            allowClear: true
        });
		$('#tipo_operador').select2({
			placeholder: "Seleccionar",
            allowClear: true
        });
		$('#cboestadocivil').select2({
			placeholder: "Seleccione Estado Civil",
            allowClear: true
        });
		$('#cbotipovia').select2({
			placeholder: "Seleccionar tipo de Via",
            allowClear: true
        });
		$('#cbotipozona').select2({
			placeholder: "Seleccionar tipo de Zona",
            allowClear: true
        });
		$('#cbomoneda').select2({
			placeholder: "Seleccionar tipo de Moneda",
            allowClear: true
        });
		$('#cbotipocuenta').select2({
			placeholder: "Seleccionar tipo de Cuenta",
            allowClear: true
        });
		
	}
	return {
        init: function () {	
            mascaras();
			calendarios();
			combos();
			datatable();
          }
    };
}();
