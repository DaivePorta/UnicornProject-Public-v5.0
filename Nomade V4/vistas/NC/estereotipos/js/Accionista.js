






function ActualizarAccionista() {
    var p_acti = $('#chkactivoacci').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    
    var p_porc = $("#txtporc").hasClass("errorPor") ? $("#txtporc").val("") : $("#txtporc").val();
    var p_fect = $('#txtfechafacci').val();
    var p_feci = $('#txtfechaiacci').val();
    var p_empr = $('#slcEmpresaacci').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtporc", "txtfechaiacci", "slcEmpresaacci", "slcPidmPersacci"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Accionista.ASHX", { flag: 2, pidm: p_pidm, parti: p_porc, fein: p_feci, user: p_user, acti: p_acti, fete: p_fect, empr: p_empr },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabaracci").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabaracci").attr("href", "javascript:ActualizarAccionista();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearAccionista() {

    var p_acti = $('#chkactivoacci').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();

    var p_porc = $("#txtporc").hasClass("errorPor") ? $("#txtporc").val("") : $("#txtporc").val();
    var p_fect = $('#txtfechafacci').val();
    var p_feci = $('#txtfechaiacci').val();
    var p_empr = $('#slcEmpresaacci').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtporc", "txtfechaiacci", "slcEmpresaacci", "slcPidmPersacci"])) {
        Bloquear("ventana");
     $.post("vistas/NC/estereotipos/ajax/Accionista.ASHX", { flag: 1, pidm: p_pidm, parti: p_porc, fein: p_feci, user: p_user, acti: p_acti, fete: p_fect, empr: p_empr },
        function (res) {
            Desbloquear("ventana");
            if (res != "") {
                exito();
                if (tipoContribuyente != '0007') {
                    $("#grabaracci").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabaracci").attr("href", "javascript:ActualizarAccionista();");

                    if ($("#masAccionistas").html() != undefined) $("#masAccionistas").css("display", "");
                } else {
                    // AQUI CERRAR EL MODAL Y CARGAR EL DT
                    tabacc(p_empr);
                    $(function () {
                        $('#crearAccionista').modal('toggle');
                    });
                    
                }
            } else {
                noexito();
            }
        });
      }
    
}

function cargarAccionista(empresa) {

   // Bloquear("ventana");

    $.ajax({async:false,

        type: "POST",
        url: "vistas/NC/estereotipos/ajax/Accionista.ASHX?pidm=" + $("#hfPPBIDEN_PIDM").val() + "&flag=3&empr="+ empresa,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
        //    Desbloquear("ventana");

            if (datos[0].PORCENTAJE != "") {
                $("#grabaracci").html("<i class='icon-pencil'></i> Modificar Datos");
                $("#grabaracci").attr("href", "javascript:ActualizarAccionista();");
            } else {
                $("#grabaracci").html("<i class='icon-pencil'></i> Grabar Datos");
                $("#grabaracci").attr("href", "javascript:CrearAccionista();");
            }
            $("#txtfechaiacci").datepicker("setDate", datos[0].FECHA_INICIO);
            if (tipoContribuyente !== '0007') {
                $("#txtporc").val(datos[0].PORCENTAJE);
            }
            

            $("#txtfechafacci").datepicker("setDate", datos[0].FECHA_FIN);
           

            if (datos[0].ESTADO == "ACTIVO") {

                $('#uniform-chkactivoacci span').removeClass().addClass("checked");
                $('#chkactivoacci').attr('checked', true);
            } else {

                $('#uniform-chkactivoacci span').removeClass();
                $('#chkactivoacci').attr('checked', false);
            }


        }
    });





}


var ACCIONISTA = function () {

    console.log(tipoContribuyente);

    var cargainicial = function () {
       
        function cargarInputsPersona() {


            var arrayPersonas = new Array();
            jsonPersonas = null;
            function cargarJson() {
                $.ajax({
                    type: "post",
                    url: "vistas/NC/ajax/NCMRDNI.ashx?flag=L",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,

                    success: function (datos) {
                        if (datos != null && datos != "") {

                            jsonPersonas = datos;

                        }
                    }
                });


                
                
            }

            function cargaAutoCompleteInputs() {

                var json = jsonPersonas;
                if (json != null) {
                    json.filter(function (e) { if (arrayPersonas.indexOf(e.NOMBRE) < 0) { arrayPersonas.push(e.NOMBRE); } });
                }

                $(".personas").typeahead({ source: arrayPersonas }, { highlight: true, hint: true });

                $(".personas").keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))

                }).on("blur",function () {
                    var actual = $(this);
                    var encontrado = false;
                    json.filter(function (d) {
                        if (d.NOMBRE == actual.val()) {
                            actual.attr("valor", d.PIDM);
                            encontrado = true;
                            

                        }
                      
                    });
                    if (!encontrado) {
                          
                            actual.removeAttr("valor").val("");
                          
                           
                    }
                    if (actual.val() == "") { actual.removeAttr("valor"); }
                   
                });


            }

            cargarJson();
            cargaAutoCompleteInputs();
        }
  
        cargarInputsPersona();

        console.log($("#txtporc").val());

       

        $('#chkactivoacci').on('change', function () {
            if ($("#chkactivoacci").is(':checked')) {

                $('#txtfechafacci').attr("disabled", true);
                $('#txtfechafacci').val('');
            } else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = dd + '/' + mm + '/' + yyyy;
                $('#txtfechafacci').val(today);
                $('#txtfechafacci').attr("disabled", false);
            }
        });

        $.ajax({
            async: false,
            type: "POST",
            url: "vistas/NC/estereotipos/ajax/Accionista.ASHX?flag=" + 4 + "&usua=" + $("#ctl00_txtus").val(),
            
            success:
                   
            function (res) {
                $("#controlempresaacci").html(res);
                $("#slcEmpresaacci option[value=0]").remove();
                $("#slcEmpresaacci").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });
                $("#slcEmpresaacci").select2("val", $("#ctl00_hddctlg").val());

                $("#slcEmpresaacci").change(function (event, empresa) {

                    if (empresa == null) {
                        empresa = $('#slcEmpresaacci').val();

                        $("#txtfechaiacci").val("");

                        if (tipoContribuyente == '0007') {
                            $("#masAccionistas").hide();
                            $("#txtporc").val(100);
                            $("#txtporc").attr("disabled", true);
                        } else {
                            $("#masAccionistas").show();
                            $("#txtporc").attr("disabled", false);
                        }

                        $("#txtfechafacci").val("");
                        $("#grabaracci").html("<i class='icon-pencil'></i> Grabar Datos");
                        $("#grabaracci").attr("href", "javascript:CrearAccionista();");
                    }

                    if ($("#hfPPBIDEN_PIDM").val() != "")
                    { cargarAccionista(empresa); }
                    
                });

            }
    });
        
    }

    var plugins = function () {

        aMayuscula(":input");

        inifechas("txtfechaiacci", "txtfechafacci");

        $('#txtporc').inputmask({ "mask": "9", "repeat": 3, "greedy": false });

        $("#masAccionistas").attr("disabled", false);

    }


    return {
        init: function () {
            plugins();
            cargainicial();
          
             
           
        }
    };


}();