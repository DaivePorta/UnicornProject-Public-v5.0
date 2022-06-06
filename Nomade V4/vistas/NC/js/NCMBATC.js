var NCMBATC = function () {

   function carganiveles()
    {
        $('#cboNivel').empty();
        $('#cboNivel').append('<option></option>');

        for (var i = 1; i <= 20; i++)
        {
            $('#cboNivel').append('<option value="' + i + '">' + i + '</option>');
         }

    }

   var cargacombos = function () {

        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmbatc.ashx?opcion=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEjecucion').empty();
                $('#cboEjecucion').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEjecucion').append('<option value="' + datos[i].codigo + '">' + datos[i].descripcion + '</option>');
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });


        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmbatc.ashx?opcion=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboProceso').empty();
                $('#cboProceso').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboProceso').append('<option value="' + datos[i].codigo + '">' + datos[i].descripcion + '</option>');
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmbatc.ashx?opcion=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboProcRef').empty();
                $('#cboProcRef').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboProcRef').append('<option value="' + datos[i].codigo + '">' + datos[i].descripcion + '</option>');
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

        carganiveles();

    }
    
   var plugins = function () {
        $("#cboEjecucion").select2();
        $("#cboProceso").select2();
        $("#cboProcRef").select2();
        $("#cboNivel").select2();
    }

   var cargainicial = function () {

        $('#btnGrabar').on('click', function () {
            if ($('#txtnombreproceso').val().trim() == '') {
                alertCustom("Debe ingresar el nombre del proceso");
                return false;
            }
            else {

                grabar();
            }
        });


        var parms = {
            data: null,
            columns: [
                { data: "db" },
                { data: "name" },
                { data: "definer" }
            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }


        var table = $('#tblbandeja').dataTable(parms);
        $('#tblbandeja').removeAttr('style');

        //se esta llenando el table

        $.ajax({
            url: "vistas/nc/ajax/ncmbatc.ashx?opcion=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                table.fnClearTable();
                table.fnAddData(datos);
            },
            error: function (msg) {
                alert(msg);
            }
        });


        $('#SP tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#SP').modal('hide');
            }


            $('#txtprocedimiento').val("");


            var pos = table.fnGetPosition(this);
            var row = table.fnGetData(pos)

            var IDPER2 = $(this).attr("id");
            $('#txtprocedimiento').val(row.name);


        });

    }

   var eventos = function () {

        $('#BuscaSP').click(function () {
            $('#SP').modal('show');
        
        });
                        
    }

   var grabar = function () {

       var data = new FormData();
       data.append('opcion', '5');
       data.append('NombreProceso', $('#txtnombreproceso').val());
       data.append('NombreProcedure', $('#txtprocedimiento').val());
       data.append('TipoProceso', $('#cboProceso').val());
       data.append('TipoEjecucion', $('#cboEjecucion').val());
       data.append('Estado', $('#chkEstado').is(':checked') ? 'A' : 'I');
       data.append('Observacion', '');
       data.append('Nivel', $('#cboNivel').val());
       data.append('CodPadre', ($('#cboProcRef').val() === '' ? '0' : $('#cboProcRef').val()));

       Bloquear('ventana');

       var jqxhr = $.ajax({
           type: "POST",
           url: "vistas/NC/ajax/NCMBATC.ASHX",
           contentType: false,
           data: data,
           processData: false,
           cache: false
       })
        .success(function (res) {
            Desbloquear("ventana");
            if (res != null) {
                if (res != '000000') {
                    exito();
                }
                else {
                    noexito();
                }
            }
        })

        .error(function () {
            Desbloquear("ventana");
            alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
        });
   }


    return {
        init: function () {
            plugins();
            cargacombos();
            cargainicial();
            eventos();
        }
    };
}();

var NCLBATC = function () {
    var datai;
    var cargainicial = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMBATC.ashx?opcion=6",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                 datai = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        var buildata = function () {
            var source = [];
            var items = [];

            //se construye el arbol

            for (i = 0; i < datai.length; i++)
            {
                var item = datai[i];
                var label = item["nombreproceso"];
                var parentid = item["codpadre"];
                var id = item["codproceso"];
                var img = '../recursos/img/Proceso.png';


                if (items[parentid]) {
                    var item = { parentid: parentid, label: label, item: item, icon: img };
                    if (!items[parentid].items) {
                        items[parentid].items = [];
                    }
                    items[parentid].items[items[parentid].items.length] = item;
                    items[id] = item;
                }
                else {
                    items[id] = { parentid: parentid, label: label, item: item, icon: img };
                    source[id] = items[id];
                }

            }

            return source;
        }


        var source = buildata();
        //$('#jqxTree').jqxExpander({ showArrow: false, toggleMode: 'none', width: '300px', height: '370px' });
        $('#jqxTree').jqxTree({ source: source, width: '350px' });
        $('#jqxTree').jqxTree('selectItem', null);
    }

    return {
        init: function () {
            cargainicial();

        }
    };
}();


