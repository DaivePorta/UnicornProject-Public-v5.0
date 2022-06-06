function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtCodigo').val();
    var p_anexo = $("#slcAnexo").val();

    var p_definicion = $('#txtDefinicion').val();
    var p_tipo_existencia = $('#slcTipoExistencia').val();

    var p_user = $('#ctl00_lblusuario').html();
    var p_info = $("#txt_info").val();
    var p_cod_sunat = $("#txtCodSunat").val();

    if (vErrors(["slcAnexo", "txtDefinicion", "slcTipoExistencia", "txtCodSunat"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMDETR.ASHX", {
            flag: 2,
            anexo: p_anexo,
            definicion: p_definicion,
            user: p_user,
            estado: p_acti,
            codigo: p_codi,
            tipo_existencia: p_tipo_existencia,
            info: p_info,
            cod_sunat: p_cod_sunat
        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
  
    var p_anexo = $("#slcAnexo").val();

    var p_definicion = $('#txtDefinicion').val();
    var p_tipo_existencia = $('#slcTipoExistencia').val();

    var p_user = $('#ctl00_lblusuario').html();

    var p_info = $("#txt_info").val();

    var p_cod_sunat = $("#txtCodSunat").val();

    if (vErrors(["slcAnexo", "txtDefinicion", "slcTipoExistencia", "txtCodSunat"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMDETR.ASHX", {
            flag: 1,
            anexo: p_anexo,
            definicion: p_definicion,
            user: p_user,
            estado: p_acti,
            tipo_existencia: p_tipo_existencia,
            info: p_info,
            cod_sunat:p_cod_sunat
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "error") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtCodigo").val(res);
                    $('#detalle_detraccion').removeAttr('style');
                } else {
                    noexito();
                }
            });
    }
}

function ValidarUltimoRegistro() {

    if (oTableDetracciones_detalle.fnGetData(0) == null) {
        return true;
    }
    if(oTableDetracciones_detalle.fnGetData(0).ESTADO == "ACTIVO") {
        return true;
    } else {
        alertCustom("Solo puede ingresar un Porcentaje adicional al vigente!");
        return false;
    }

}

function CrearDetalle(fechai,fechat, porcentaje, indice) {

    var p_codi = $('#txtCodigo').val();
  
    var p_fechai = fechai == undefined ? $("#txtfechai").val() : fechai;

    var p_indice = indice == undefined ? "" : indice;

    var p_fechat = fechat==undefined?$('#txtfechat').val():fechat;
   
    var p_porcentaje = porcentaje==undefined?$('#txtPorcentaje').val():porcentaje;

    var p_user = $('#ctl00_lblusuario').html();

   var v_verificacion = indice == undefined ? vErrors(["txtfechai", "txtCodigo", "txtPorcentaje"]) : vErrors(["txtfechat_m", "txtPorcentaje_m"]);

    if (v_verificacion) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMDETR.ASHX", {
            flag: 4,
            porcentaje: p_porcentaje,
            fecha_inicio: p_fechai,
            fecha_fin: p_fechat,
            user: p_user,
            codigo: p_codi,
            indice:p_indice
            
        },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error")<0) {
                    exito();
                    CargaTablaDetracciones_detalle(p_codi);
                    $("#txtfechai").val("");
                    $('#txtfechat').val("");
                    $('#txtPorcentaje').val("");

                    if( $("#modaleditarRegistro").html()!=undefined)$("#modaleditarRegistro").modal("hide");

                } else {
                    noexito();
                }
            });
    }
}


function Confirmacion() {

    var imagen_Interrogacion = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACYCAYAAAALMDf8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACk0SURBVHhe7Z2Hf1RV+sb9J1Z3pbq7uisixQKBEAgEVKRKC01UFnVxcXHFBixroQvSSShJIL0npEMSCB1CaIJIUVDAgpBCgFD19/7Oc+7cmXPv3ElmJpOC8z6fz/MJShLuzNzvc95T7wPEYrH8Ug9Atj+zWCw/EwcAi+XH4gBgsfxYHAAslh+LA4DF8mNxALBYfiwOABbLj8UBwGL5sTgAWCw/FgcAi+XH4gBgsfxYHAAslh+LA4DF8mNxALBYfiwOABbLj8UBwGL5sTgAWCw/FgcAi+XH4gBgsfxYHAAslh+LA+B3rt9++41Onz5NpaWlVFBQQGvWrHHLUVFR8vuPHDlCFy5csP021u9NHAC/M33//fe0detWioiIoMWLF9Ps2bMpPj6eNm/eTGVlZfTDDz+45XPnzsnvz8zMpMjISPl7li1bJn/Xvn376PLly7Z/kXU/iwPgPld1dTXt3LlTAj937lwJ644dOyTA+Lv/+7//85mvXLlCp06dkmGyevVq+uKLLygxMZEOHTpEd+/etV0R634SB8B9KMCGkh6lOlr54uJiCfzt27ctwW0oV1ZW0okTJ2SVsGDBAoqLi6MzZ87Ibgfr/hAHwH2kixcv0oYNG2RLn5OTQ998840lmE3hGzduyDBABbJo0SI5fnDt2jXblbOaqzgA7gOhX48SH2U3SnBPW/qrV69SeXm5rBJKy45TcvoO4e21Gt+H78fP4eetfq8rozLAOASqk/T0dKqqqrK9ElZzEwdAMxbADw8Pp1WrVknwrWAzG+Fw6dIlOiAAXhOVTzPnJNCkdxNo/JQEChoWRz1HJFHwqAy7e41UnW530PAECnwphsb9K47+8Z94mjEnnpaFZ9GOPYfoxx9/pJs3b1r++6pRFWA8AkGQnJwsw4TVvMQB0AyFwbuYmBgKCwtzC3yAduyr0xL4abMSacSkBA300BzqPbbQ7uAx8BYX3izda7TuApPzqWfoJgoclkCDXomht6fH0dKwTaJSOCZLfavr0q0HAQYNt2zZQrdu3bK9UlZTiwOgGQmDe4WFhbIPjSm4e/fuWQIFowXG/Dygn/JREvUJBfC5AvQiC+id4e81WrUKvgv4nZxHQaMyqfuwWHp9WqwMg1Onv621MkBQpKam0tKlS+n48eP066+/2l45q6nEAdBMhP425tlzc3Nli2kFEAzAdu45Qu/MTKTnxiYo0Os2Q685ZHyhANkMvg6/A/aeTraGX3eQzT1EGPQcES3CKJbyNu+ttSpAcKFrgwFDXk/QtOIAaGKhFURZDCCwAMcKGNgBfpIALcUEfZGAHNZg7/dyEQ2bvINenLiVXnh1Kz3/SpENdhV655Zehz4oNN9mAbeTc+3u4cLdRDdh0rsxlFtLEKC62b17t6wGsI6Aq4GmEQdAEwqj5evWrZNTZq5G9tEtKDt0wgZ+qiX4fV8uplFTdtDkWftpyscHaOw7u2QIOAOv2gZ9qGYH9Nbw9xgFC8BtDjQ4x25jEMTLICjaVury9Z0/f16OdWRkZMjKh9W44gBoImHOfMWKFfT1119bggFjNH/ekiwKCQX4xU7gj3hrB70xYz99tPAwvfNZGQ15o0RAbdXSO9wzFHaAr8LfY5RuHXjVdcNvdLbd3V6Ko+lzkunbs99bvk6Aj+lCVEE//fST7R1iNYY4AJpAGBHHgh5XS3VR7idn7KCRrydRsIBWhR/gj5qyk6bNPUTTFx2hDxccpgnv7hF/Z+7jm6F3hj9oVIEAWgXfAX/gSNUCdJu7G5zjwtkGdxuZJZxJz43dQOs25rvsFhw8eFCudcAAIatxxAHQyEKpm52d7XKEH92CmXMzKXhUlg18DX6Aj369Dv5Hnx+R5T76+EbwNfiN0GsG8Kp16ANH6jaDb4S/m4C7bgN4M/wOBwxPon9+EEcXLv5o+fpREWGJM8YFeElxw4sDoJGEvjxa/b1791re+PCpM9/Ra1NFqz9mix1+vY8/afo+O/jvzz9EoW/vtAB/iwX0uo3wO6A3wu+qhbeG3WwNft0BAN7gTdKoBoa/vpF27/vS8n347rvv5OKnXbt28eBgA4sDoBEE+DHQhX35Vjc8bvKCwgP00kSM7uutvgb/oEkl9M7sgxJ8+I2Z+00DfDr4Rvgd4Dvg7yFAh1XwuztBb4S/24gcCjBYgG1pAbjBAnYr20IADg6NpvjUYvn+mN8T7DzEmABmCjgEGk4cAA0s3NwbN26UrZr5Jodxcyel76Z+YzKd4H9Z9O31Vh99/dH/3uUCfAf8RvA326FX4deg1+2AvtsI3Rr4lvAPt7IAXnHX4ZvstgwB6UzprkPjacX6vFpDAFUTdwcaRhwADayEhAQ54m++uWE7/GOzDeD3f20bvf1JmR3+d+ccpIGiErAGX4PfGXxHi28Nfp4CvDP8AcPNtgIfdg2/ZgG5kzOkZQAIP/tSIq1Y5zoEMDB49OhR2zvK8qU4ABpQWVlZct+++aaGXcGPEX708fWSf/J/S6nPuGKX8FuD71zu69APmlRM//p4H4XFnaSI5DN08NgVOn32Kp06W2Vw3rYL4nu+psn/20v9J26hrsOyLSyAV9xl2CaTMy2swQ93UfwMKoF1uS5DAGMCZ8+etb2zLF+JA6CBhDX9JSUlTjczDPij4oqd4FdLfnjsO7sF8I7pPRV8M/wO8DX4dfDHTt1JyzZ8TQePl9O9X3+jW7fv0dVrt+nmzdtycQ7m4K9fvy6nJGFs/cX2XUzVXbt2nSqv1tDNW/fowLHL9N8lB23gZwuQjbA/K+CuzTr8up81OF2EQLoMgeW1hABWDfLSYd+KA6ABhJYqNjbW5VRfVt4+Af8mA/wTPzCO8mslvzX8rsHXRvenfFJK2/b9RFXVd+hGzT0B8F26c+cO1dTUSNhhAK4Cj+lHbNcFaDBA++WXX+RipJ9//ln+fUWl+Lkbdyl323ka8mahBN8d+DU7gH9GMeBX/XQtIYBBVHQH8FpYvhEHgI+FFhXlqqtFPqVlJ2jQq2kG+LGaT4X/xYnbPIb/1fd3U8aW8xJ4QIoqAwEEWNDSYwsuFhi5GwIIAHMIYJUe/ozvRRUxZ/UReualTJMF2E4WrbvNTyt+RgBvNkIgYFgsxSRvk6/B/P6hqkpLS7O926z6igPAx4qOjnY53Xfxh59ozORkly0/RvoHv77dDr8r8M3wX/z5hgQfwr+DEXM9ANCS1icEEADmEMCBIPDl8mo6eOwXCh6XK1ruTOEMC6NV1/wUvtoDIM3JjiDIECEQQ2nZO53eQ7wmVFeHDx+Wr5dVP3EA+FB79uyh/Px8p5sWBmBvfahv5tHgHyf6+Gqff+S/sLindvhV8ANthgA9/h0IX90NAa2vX3cIIADMIYDdi5cuXabyyps09j9bFeit4Xc4zcmOINACAiHQOzSKDh5xnkHBtWIfBa6TVT9xAPhIgAU3pVW/H8B98nm2fV0/4MdGHlcDfp7Ajz4/BNgbIwQQAOYQwJ+vVNbQwNcL6KkhAnCTOxucZrAxCBAOmvUuw6g3IqiiosLwfsLYL4BzEvEaWd6LA8BHclX6A8B10YW247k0+DHPjx18Ovyvvr/Ha/i7j9ACAJDXNwQQAPUJgZ8u36CeY3Ko82ABt82dDE612xwEakiolcPTQ1Joxrxkec3q+wrjQBHsHWB5Lw4AH+jkyZPyiTnmGxTGiH9fZcQf6/rVpb2vT99fL/j1AADcjR0CEnolBPB3Z85VyQU+RvCN8Dtb+x7Ab64e0JXoPDCWYpMKDe8rjGvCOYN4TSzvxAFQT+Hmw9QUbkbzDfrd9xdo6MQkO/xo/d+cud8OP/bw4/8BfjUAPIG/2/A8eR2AuqlCAAGgh0B5RSWlFZy1Q+0u/LBaOXQebAyCkNERdPac83LqoqIiaZZ34gCop0pKSmj79u1ONybg+ugz46DfmKm7DNN9z73i2MrrLvw6+Dr8AbYAwL/nbgjge9wJAQSAJyGAAIArqm7S0MmbqeOg1DqtBoDDoitg9qAUmj43SV6v+j5j2hVVAK6Z5bk4AOohQISbDzehelPCmTmiXz9KL/2LaMjr2w2DfkPewHSf63l+d+HXAwAQN1QIIAA8CQF8z/6jl6jDwBRLO4WAwVoAqO48WHQDhJ8eGEn7DxwzvM8wDljB48lYnosDoB5y1fpfvPgTjXlLn+8von6i3//ePMdBHuP/g0E/38AfMCxXXgvgbegQQAC4GwJV1bdo5L8LLQOgw8BUuzsaLOBHAKgW4OtGCIz/V5S8JvX9RgDj4SNcBXguDgAvBXCwNt3c+gOsBcszbVN+2jFek2eV2uHHfn4dfjUAdPjVANDhN/f5Vfj1AAC0ViEAuwoBPQh0IzD0MKgtBDAtV1cI4Hs3FX1HTw5IMTnV7g6KAb/ZnQaJCkBx58GZ1PGFjZSVu8vwnsOoAnCkOsszcQB4KZxWY9X64+DLga+g9dfgH/CPbXb4MegXMt69QT934Q8YliOvB7DWFgKA/d69X6n6+m3x379S1dWbdPLby7Rj/zkKi95v98lvLtPZ8xV08/ZdulGjbRbyJgTg27fv0dND06j9gGSbU+xGGDgCIM3JHQemG9x5kKgAbB73VqTLKgCvneW+OAC81PLlyyUI6k3oaP0L7AGAUX89AHBOvxl+NQB0+B0B4IAftoK/qy0AAKk5BAB+zc07dEvADNiXReyhidPSqPuQNfRk3+XUPmSZ3U/00dyuz1LpoOFraXnkXqoUQYHf500IXKmopn/P3m0Jv1VF4KgM0g3uNFB0AWxGAHR4fiNtynVeJoxxgJ07d8r3g+WeOAC8EB7aiUUo5htQa/0x7afBj76/96W/e/CrAQCjJbxRc8sO/exlJdRn1HoJvG4VfDP8j/dWvYSChq2hc6gIagkBBIBVCOB7E7JP0RMvptjd3uBUg7UASDMYAdBxQIbdnQZmSo+b7FwF4HHpCGZUOyz3xAHghXCyL06oUW8+tP6zF6cTHrCpB8Br7++1BcBhF62/a/jVALDDbw8AB/x6AKDlv1ot+u037lBk0kEBfQR16LtC2AG+Gf52wZ/T40FzpP8eNJv+FvSZ3Y/1+EQYXz+lPqHhdPXarVrHBKwCAP//+Klf6M99EqhtcDw9Ity2Vzy1CooTxlezE+xu2yuR/hycRH/unSz9WN8U+lu/VHr8uTRq94LoEvSPpH2lxkNFMYaxcOFCeR0s98QB4KEAutXgH0a+X3otwdD6Y7nv9EWHXbT+zvBrAeAZ/F1eyqGaW/foyFc/0IdzN1PHfitt4DvD/0TvxdSu51zpxwXwaPU7PB9JT/aPow79E0Rrmyz723o//MkXE6ndc1H0t16L6NKVa7JboYeAVVfAHAD47x8vXaWWQbECakCvu3b44dZBiSYnGdwqMJY+/HSj4TOAMRDIg4HuiwPAQ2HtOZ5wa77xYhK3UnAozvLXAkBb9IP1/sbWXwsA4wGeruDvNsIZfjUAAH+Xl7Kln+w93xL+9n0WUbteAngB/ROixO/4QhR1ejHJPqCmDrRpfW7HQBxK8if6p9Jj/ZLo0HEM6tU9KKiGAP58peI6teweKaD2Hfy6ew5bKf8t9XPQuwEY/2DVLQ4AD5WcnOz0zH7A8M/3E+3wh4zX5/2tWn/n03u1AHAc4+UEvwwA1/A/OzRLBoAd/pCl9ESv+RJ8hEDH/rFyTl2HHsaAmiv4272QQo/2TRJlOIDUwN1z6Gc5q4CuhrshgG5BuQiAFgFhtt/jO/hbByVTiy5hVFC0x/BZ6N0AVCCsusUB4KGw8s88+HTk6NcUMtox9YfjuwE/bGz9nc/tN8MPA35j62+EXwsAB/zP2ALgyT6LqX3wfGrf+3PqJFp6bU39JpszLeHXR9rR0v81JInaSOh1ODX4/xqSSNdr7soKAIOB7oYAviIAHn52mfI7VXsPv+YkevPdtbJbpn4eSUlJ8onLrLrFAeCBcEPjuC/1ZoNXrcul4NH6c/oLbVN/h+n16fsM8FsHgPH0Xif4h1uV/hr8MOCXARCyhDr2W02dBsTTUwJ4uC7427+YRn/rl2Jr6c1w6iV7HM0JO0w3apxXC9YVAvj/O0u/pYc6z1F+r+76wp9MbYT7jlwlKw3189i3b598ngDPBtQtDgAPdODAAdq8ebPhZgME78xMpD7jNPix0AcbfRAAAyfhbL+64dcDQDurXw0AZ/jlibwm+J8eAm+Sdgf+x59PpUd6J9ngM4MJO+Bv1z+Fyqu0NQVWS4ZrC4Hr12/QknU76cEO/1N+N+wb+OG23VbQsePGJyyfO3eOli1bJq+LVbs4ADxQSkqKU/8fawIGTkAAFMoAGPpGiYT/ndllNvhdBYBW+tcKv1MAOMOvBYB78KPFd4BfN/wthfcd/YXu3NWWCnscAlU3aOikaFMA+A5+uFVAJK3bkGf4THB98+bNk09jYtUuDgAPZLX6b1POLgoelW4PgFem4Wz/wzTuHfUxXuYAMD6rT39ohyMArOHXA+BZQ+tvhN8RAEb4H+0rYDHAp0Kv2wh/Uu63dOu21r/W9w24GwL4Wl55gx7s9KkSAOq/X3/42wSlyK9W4wA4Lqy4uNj2ybFciQPATeHGX7BggeEmgz9diJV/m+0BMPWzMjn/b3yApxoAjif0qq2/IwBs8BsCwBp+162/gN8WAO1eSKM2vRJN8JnBh43wR6ScpKvX7sjXCOGrJyFQfa2G5q8uEfDPoj8+NV/8XvXf9xX8mgeOXy1DR/1c8FQmPJMR18tyLQ4AN3Xx4kWn5b+4+afOiLPD/9wELP09TG/O3Ed4xHe94LcHgP4YLg3+ult/DX6M7GMFnRk8d+BfL+Cvqr4t4QH0eK0QvrodAtdv0ZN9l9Ef2n9ED3ddJX634xp8CT/cffAqufdA/WywWWvNmjXymliuxQHgpnAOfU5OjuEmw1z3+CkJ9gDAM/sRAMMmb7cIgAJDAAB+YwBoD+esC/7aAkBv9TGyD7BU6DTXDX9W8XdUefWWhBuQexMCaP0/XVosR/8RAC26RYjf3zDww20DVtKZM2cMn82XX35JK1eulIORLNfiAHBTGP1HCKg3GVad9Q11BMCbM/bRe/MOyv82lv8a/HoA9Bilwe8IAMfTeR0BkG0PgC5KALhu/TNlud+2F+DxHP6/hCTSll0X6JpouQEzoPYmBPD17Pfl1LrrAnqo02z6w5Mzbf9Ww8DfJiiVWnRZ47QgSJ8JuHDhgrxmlrU4ANxUXFwcnT9/3nCT5RTspuBRabYA2EJTPi6liR/sUVp/uMAQAIDfGADGZ/NrAaC1/jDgdwSAdd8fLf9f+gAYDSxv4C879ovcTIQWHC25tyFQXllDIaPXi9Z/roB/Bv1JLgJqOPjhVt020sq1WYbPBmsDlixZIp8fwHItDgA3tW7dOrnhR73JomK3UO/QTTIA4GlzD9Jwp/LfEQBBoRr8jgDQWn9jAAj4bQGgt/5aAGRZBgC2yD5ia/Vhb+D/9vxVAb+2yQd9eG9DAE8Sfv2DdAm/DABR/rcM3GC/NofN0Ov2HH64dWAczZobZ/hsMBCJVZt4PDvLtTgA3BQGlMwBsDFOtPyhmfYA+GDBIQoZXygDANuC1QAA/MYAyLMIABv8wnrfXwsADX5zAGCgr01PB1jewH9AtPxVV7XdfYDG2xDASUNzV5Y44Le1/kbwYSvwYe/glw6MtwwA7NrkA0JqFweAm8IaANxU6k22eGUG9R6TI+HvN6FIdgHQFQD8agD0dAoADX5jAOQ4BUBt8KO/r4LlLfyVldVybQMW73gbAjg1aF18qR3+hzp9Jqf/WvWIM1yjNfiw9/C3DUoTTqW33ltr+GxgTNtyANQuDgA3ZbUJaO4XKdRnbK4MgBdfK6axU3eJANDg1wMA8BsDIM8iADT49QBwtP5ZlgHw936i7FXA8hR+jPbvPfwzlVdUyTX7GCn3NgRwtuBH8wsc8MuR/+nUsnuU4RqtwYfrC7/mSVPDDJ8NjF2BBQXaw1NZ1uIAcFOLFi2SQKg32MfzE0QA5MsAeOnNEnpxIo4BVwPA1v+3B4AGvzEAcuwBEFBHAGDA79EQbYpPtzfwv79wP12uuC6nMfVde96EQEVVDU2YmqLAj37/dGrRNdxwjdbgw76BnwPAe3EAuCmcOOtUASxOtlcAQ97YJuF3BIAGvx4APUdbBYDW+sMSflsABAx3DgDAj4U9KljewI/n75VX3bQf2uFtCFy6ct0+2q/C/3CXFYZrtAYf9h38bYPSOQC8FAeAm7LsAtgCIGTcFuo7HlOBegAUmAIg3x4AeggAfj0AuhkCINspADoPyrTP7+v2Bn44dtMZqqiskivncGiGpyGAALh0+ZoJfq3sb4qWH/BzAHgvDgA3hRFl877z8Mg86j16kwyAPjYHIwBsIaAFgAa/MQA0+GHA7wgADX41ADoMyDCM9MPewo/Wv/rabfngDtjTEEAAXKm4YYRfLvaZQS27RRiu0Rp82PfwtwlMog8/MZ4PiCoFVRsHQO3iAHBTYWFhTtOA2IbaOzTDHgC9x9ngt1cB+RYBkCsDAJaj//YAEOCbAgDwG6HyHn6t9T9NV8or5b4GvBZPQ6C88rphnt++0i9wo+k6rcCHfQ+/FgAJltOAWAm4detW2yfIshIHgJuyWgcQHb+FAoam2AJAlP+GAMi3B4AeAoBfD4BAWwDoIWAOgCdeSBegqFDVD36czFt9/Y58DVge62kIXKm4RkvX71bg/6xZwA+37h4vu2PqZ4MA4HUAdYsDwE1FRUXJtf/qTba/9Ah1fG6DhF8PAC0EROsPGwIgTxoBEGgIAK0CsIeAgB/n3huhqj/8z0/MlaP2OMAES5o9CQGU/8dO/mxq+Wc0C/jhVgEbZBirnw1eBzYDcQDULg4AN4XHTuGsOfUmw4kzXQaspZDxjgqg9zgb/LYA0EJAgx/ugQrAHgK2KUAlAP7ez7jAB64v/PD8NYcFzFXymj0JAQQADvbA1l49ALR5/kjTdVqBDzcs/HDLZ8NlGKufDcIa3baysjLbJ8iyEgeAm9q7d68MAfUmAxyDJzgCoI+A3zkA8mQAwEGGAMixB4AeAg0FPxydcUq26Ngl50kIVFRW0ydLsLXXBj8G/JpwtN/ZGfRY0Go6e/as4bPBzs3Vq7X/z3ItDgA3hRYF4wDqTYYFMRPeCpMBEDLeEQCOEHAEgCz/LUJAD4CGKPtVF+2+IMEGEO6GgKwARLehddeFEn4c7fWnpz43XacV+HDjwA8HDg6T16x+Nhj8wwYuvA6Wa3EAuCkMKs2ZM0c+eEK90TD91Cs02x4AjipAwK8HgLB9DGC0Br9aBbTv37Dww8dOXZGQI8jcDQFsEpq1qEhr/Tt9Rg/hbD/D+n4z9LobD3542KvhcpxC/VzS09PlFm4MYLJciwPATWEBzOeffy5HxdUbLTl9KwUMTZQB4KgC8qX1EHAEQK4MAD0EAD8W+ajgw76GH75SeVNCj5Nz3A0BHA7yzIBVWuuP0j9gnXKdVuDDjQt/mx6p9J8Zzk9qxvFtCAF8bizX4gBwU9j4gh2B5mPBAU7f0Cjq+7IeANgbYAsAWwggALQQyLWHAAIAu/pU8OGGgB++d+83On36tLQ7IYD+//cXK7XWv+OnogKYo1ynFfhw48IPt+oaJUJ4m+Ez0RcBFRYWys+N5VocAB4IDwXFI6fUmw1LZCdOjbQFQIE0AkDCbwuA4LFaAOghgADAKj9frfCrC378PXTy5EkZYO6EQGXVVVqyfjf9sfM8ehCj/gHrbddpBT7c+PDDjwSsdjoPEK8HA4AYCGTVLg4AD/TVV1/JG0u92eAFS1MoZOwmEQJaANi7ANJ5MgD0EEAAoPXHs+8bC349APBkY3dD4HJ5Nb36bpoIAK38b90jXlynGXrdTQM/3HdkuNMSbf1EYFQyrNrFAeCBMKCEDSYYEFRvuAMHj1HwqFgtAIT7GELAGACwL/bzewI/DJ04ccLtEKiswpr/SHqow8f0p6cWiuu0Ah9uOvjhN99dL88mUD+P6OhoWa1hYJBVuzgAPBBuNKwvN48DYK38uLdEN2CC6AbYAqDPeC0AzCGAY7sbG3783I0az56Xf+PmHXqs5xKl/G9u8GeK/n8kbcrdafgsMEuDw0BxijP3/+sWB4CHSktLk6PL6k0Hr47IoT5jRUkqQyBfBoAeAjIAhANGGPv9jQW/7j+0/4CwdddobYGPbvT5VSMAWnWPFtfbvOCHg4eFy8FK9XNANYMVgNz/d08cAB4KJTPOBjCfDoTSuf/LMSIA0A3IdwqBXmNEv1850KOx4cfve6jjxzIEHP7Q4Afbf2TydNkFaN0Dx3o3L/jb9Eijtz+Mcir/8/LyaMOGDXIRE6tucQB4KPQrV6xYIfvT6o2HG3Ha/6Kp34R8pxDoLVp/9RDPpoDf2cZr0K/NYRV41U0PP9yyy3oqKNpr+AzU8h9HlrHqFgeAF8KeAKwyU28+eNeew/TcuEQRAgVKCOBpv1kCGIbfV/DDg8aHy7EX9f3Xy388FozlnjgAvBBGzLEq0DwbgFVnU2fEyipACwFUAHn20t8MnjWcDnhVqK2h1+34PvXnrX9/Aj01JIPenbeflkQdp2OnyqV3lf1ES8V/D/lnkQ325gt/q4Bop+2/MMp/PBEYm7RY7okDwAuhG4CNJjt27HC6CWUVMB5VAEIgXz62qznB/0Xkl3SlooZ+vlQh+8mY8oOx/Bfz6VcqrtP3P1TTtHmlNvCbF/xw4OBwp80/GJNB14xH/z0TB4CXwtkAmBI0DwbKKmBmLD33ijbwh1H/5gD/X0OS6dyFarrwwyU5/4/1AOpaAH09AL5iIdCly1X03cVqejQEYxfNB36c/rNohfMsDLZrI5SxloHlvjgAvBT21mNV4IEDB5xuxn0HjtHQSUlywU9zgB//bm6JaOnPX7SDr0P/7bff2hcBmX3pl0qas/pos4EfDhy8xqn1x+BfeHi4fHw7D/55Jg4AL4UyE+UmBp3MW4QxIzBvaap8Ok5zgP+DhaX0w0/lBvgBPiA37wFQjW5BxdVb9JioApoD/K0CYkTfv9DwXsNHjx6VAYDXxfJMHAD1EA6bQBWAG9B8U2Ig6vkxKyWATQl/t5FZVF5VY1/+q8IP8AG6ugXYbBwGivGApoYfHjEx0mnkH+GLdf/Z2dny2HKWZ+IAqIdQBeTn58u+p3ksAC7cup/aBq6yABN2wKtCbQ29bsf3qT9v/fu14PlkxSFRyl+RAWAFvw6+egyYagCXu+0CNS38m+jP3SNo5+5DTu8xwnft2rV0/Phx26fC8kQcAPUUwMHhEziCynxzoivwycJEeYCmEU4HvCrU1tDrdnyf+vPG36tbrzoS5PQeWni0/hjkM8OP/rQOPmYB9JOA5WGg4s/YAHX+h2pqSvjbBCbTjNkJTqv+9JF/bNHmgz+8EweAD1RaWipnBMzbUvWb9LWp66lljxgbnA54Vaitodft+D71553Bhx3ww3gSEFp+jPbrrb8ZfvUIcP1BILr1I7WaCn58HfJKhLw283ubm5srF2ThNbG8EweADwTIU1JS5DZU800KIxj6jwsTQMYKNx78WH+Qs/V7WeIjBDDar7f++H8q/DjqDMBjcdP169fla4LRr8bJQE0D/yZ66vn19OXx007vKQIM4y/bt2/nef96iAPAR0KJvX79ejpyxHg+ve7jJ87QswMwKKiCD1tBr9vxfd7AD094bztdulxtCAB0CdD6o+zX4Qf4WOCkQ4+SGr59+w4tWVtCTQH/X4JiKDbJuWuFgT9s+MGuTN70Uz9xAPhImH/etm2bnBa06grAxSUH6NHgVQrYVtDrrj/8ujO3iLL/onYkuDkA9LIfAQDw8QhwHHcOA7Rr129Th74rqbHhb909iWbNT5XXYX4fMf2amJjIW359IA4AHwotKFoltE7mtQG610fniRt8rQK6lX0HP5byPhqSSie+qZBls1UAoPRH2Y8AwIGaCDOU1ffu/UoxqQfkgSCNCT8G/d6ZmSirEfP7h7UMGHRF6c+LfuovDgAfCwtqYmJiZCtlvnlhtGj/nZ9ALbqvV4BvOPh14+EjlytqZL8fYwBWAaC3/vpo+9XqW9QhZDmp5X+Dw98jnV6ZEi3D1PzeobLCnD8e+Y2/Z9VfHAANIIwDYG4arZX5JobRsr0xLZJaBEYq4Dcc/GoIlH15SR74ibIf1qf6cE1o/e/cuUvXbtymnMKv6Znnl1HrwARqTPjH/XOjDCTze4ZrQ8uPBT8IWZZvxAHQAEILiqfSYlAQS23NNzOMFuztmTFKCDQs/Jq1TT0vT9tG2YUn6djXP9qumOjmrbt0/OTPNGdZEbUPnk8PP7W4WcEfHx8vp/243+9bcQA0kFBKY1AQlYCrQUG0uloIRDUa/OrGnlbdIunhp7+ghzp8Qg+2n0F/7PApPfzMcmrVPUb8fSP2+d2AH3v9sd4C4crynTgAGlAIgaKiIrlU2Hx4iG57CHSPEEA3HvxNv7ZfH/BLrRN+jKfgrH+8nyzfigOggYWbFktVEQLm5wrqRgjMmp9IjwSFC7D9B/7W3eLo7Y9ia4UfAYpKipf6Now4ABpBCAHsVccINqbizDc7jO+JSSqkJ0KsNg/9/uD/e/AGWhqWLcE2vxeolrCqUoefd/k1nDgAGkm40XEzY/kqdq6Zb3rde0uPUq/hK5W9A783+DOp64AIyt28z2lzD4zxEpzrh81VDH/DiwOgEYVWHn3ZqKgo2bq5WiyEk3smv7fetpX49wN/q64b6NUpEXT8xDeWrxtrFDBzgkU+DH/jiAOgkaWHADYPYTmrq3EBfB/OE8ChIi26RwqY71/4sbIveNga+Rhvq5IfPnjwoKyO9uzZw/A3ojgAmkB6CGRlZcnBQVcLhmCs1Fu0IpU69ltGrQI3CrDvH/jbBKZQ+z5r5V5+rDq0en0Y7MPyaQz44T1h+BtXHABNJKxjx6IWTHFh7wC+uuoSwFj9NmturAiC5SIImuez+ozgr6Fps6Lp5KlvLPv6MEp+rJPAHD/6/GVlZTIcWY0nDoAmFjbnYJowIyNDzhLg1B4rWHSrQdCi65pmBX/rgBjq3C+sTvAx7QngUfJjxSReP3Yq8r7+xhcHQDMQynyUvgAhIiJClsNoHa3g0Y0gSE7fSmPeWE3teq+glt2iBNCND3/r7on0WFAYjfpHOK3bkC+vyxX4MM7ww5ZplP0lJSXydeP1s5pGHADNROgS4Jl26ArgoFG0joWFhS5XEOrGoBr2G6xcmyXD4Nn+K6lFl9UCTCzn9T38bQITqWWXdbKlB/RzFyfL1hututX16caxXdjMg52SeKISwg7Tobylt2nFAdDMBOAxGAb409LSaPny5W4FAYwwwEKj7TvLBJhJIhDCqO/I1dQ2QITCMyupVUCUCIZYAXLd8OMJPK0DosXPraZHAlaL3xMugZ81N04+lRctfV3QwwAfi3owvYeyH+BjpJ+38zYPcQA0Q6EvjD37AL+4uNjjINCNQMDCGhwHdvTLr0SJnidb7ElTw+o0vg8lPX4OP4/f4w7wujGWoYMP6GEEAE5RZjUfcQA0Y6E8Rguqt5xYO4AgAFgnTpzwCMjGMNY0oHpBHx9jGRjdR5cGC3sAPu/ka37iALgPBHBwii9AAlBYP4Cpw6VLl8o/o7XFfLoVlA1tQI+xC/TvcUY/BjCxbx+Bhe27OHCE1XzFAXAfCV0DAIXBMxyLhTDAakK0tosXL5aVAZ5a7GrDkS+MoEHgoDuCRUyAHkubMzMzJfQIKQwKch///hAHwH0qVAVqGOhdBLTEKMEXLlwoW2NUCFhgA2g9CQaAju9HVwM/n5ycLH83ggaLdxA2DP39Lw6A34kAH/rZKMf1MQNAi511aKURCviKYHDHAF39OTyBB3P3qDqweAcDgziTHwONrPtXHAC/U2E9PUIBYwcwlh3DqBbcMXYr4vtRYeDnsZYfv4+X6v6+xAHAYvmxOABYLD8WBwCL5cfiAGCx/FgcACyWH4sDgMXyY3EAsFh+LA4AFsuPxQHAYvmxOABYLD8WBwCL5cfiAGCx/FgcACyWH4sDgMXyY3EAsFh+LA4AFsuPxQHAYvmxOABYLD8WBwCL5cfiAGCx/FgPPPDAA/8P4gsY3+Nl4qQAAAAASUVORK5CYII=";

    $("#mensajeModal").html(
        "<div class='row-fluid'>" +
         "<div class='span5'>" +
         "<img src='"+imagen_Interrogacion+"'+></img>"+
         "</div>"+
        "<div class='span7'>" +
         "<div class='row-fluid'>" +
          "<div class='span12'>" +
        "Está seguro de agregar el porcentaje de detracción:" +
        "</div>" +
        "</div>" +
          "<div class='row-fluid'>" +
        "<div class='span4'><b>FECHA INICIO:</b></div><div class='span4'>" + $("#txtfechai").val() + "</div></div>" +
          "<div class='row-fluid'>" +
       "<div class='span4'><b>FECHA FIN:</b></div><div class='span4'>" + ($("#txtfechat").val() == "" ? "vacío" : $("#txtfechat").val()) + "</div></div>" +
         "<div class='row-fluid'>" +
        "<div class='span4'><b>PORCENTAJE:</b></div><div class='span4'>" + $('#txtPorcentaje').val() + "%</div></div></div></div>");
        

    if (vErrors(["txtfechai", "txtCodigo", "txtPorcentaje"]) && ValidarUltimoRegistro()) {
        $("#modalconfir").modal('show');
    }

}

$("#rptasi").click(function () {
    CrearDetalle();
    $("#modalconfir").modal('hide');
});




var NCLDETR = function () {

    var fillBandejaDetracciones = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DEFINICION" },
                { data: "TIPO_EXISTENCIA" },
                {
                    data: "PORCENTAJE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableDetracciones = iniciaTabla('tblDetr', parms);
        $('#tblDetr').removeAttr('style');



        $('#tblDetr tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableDetracciones.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableDetracciones.fnGetPosition(this);
                var row = oTableDetracciones.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmdetr&codigo=' + codigo;
            }

        });



        $('#tblDetr tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableDetracciones.api(true).row($(this).parent().parent()).index();
            var row = oTableDetracciones.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMDETR.ASHX", { flag: 3, codigo: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableDetracciones.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableDetracciones);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }

    


    return {
        init: function () {

            fillBandejaDetracciones();
        }
    };

}();

$("#txtfechai").focus(function () {
    var date = new Date();
    var fecha_actual = parseInt(date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString());
    var row = oTableDetracciones_detalle.fnGetData(0);
    if (row != null) {
        var fecha = row.FECHA_FIN;
        if (row.FECHA_FIN == "") {
            if (parseInt(row.FECHA_INICIO.split("/").reverse().join("")) > fecha_actual) {
                var fecha_arr2 = row.FECHA_INICIO.split("/")
                fecha_arr2[0] = parseInt(fecha_arr2[0]) + 1;
                $("#txtfechai").datepicker('setStartDate', fecha_arr2.join("-"));
            } else {
                $("#txtfechai").datepicker('setStartDate', '+1d');
            }
        } else {
            var fecha_arr = fecha.split("/")
            fecha_arr[0] = parseInt(fecha_arr[0]) + 1
            $("#txtfechai").datepicker('setStartDate', fecha_arr.join("-"));
        }
    } else {
        $(this).datepicker('setStartDate', 'd');
    }
});



var indice;
function cargaMenu() {
    
    $('#tblDetrDetalle tbody').on('click', 'tr', function () {
     //   var pos = oTableDetracciones_detalle.fnGetPosition(this);
        var row = oTableDetracciones_detalle.fnGetData(0);
         editarRegistro(row); 

            oTableDetracciones_detalle.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        

    });

    $($('#tblDetrDetalle tbody tr')[0]).bind('contextmenu', function (e) {
      
        if (oTableDetracciones_detalle.fnGetData(0).ESTADO != 'ACTIVO') {
            $("#menuEditar").css({ 'display': 'block', 'left': e.pageX, 'top': e.pageY });
            $(this).trigger("click");
        }
                   return false;
    });

    $($('#tblDetrDetalle tbody tr')[0]).attr("title", "click derecho para editar");


}

function editarRegistro(row) {

   
    var bodyER= "<div class='row-fluid'>" +
                "<div class='span4'><b>FECHA INICIO:</b></div><div class='span4'> <div class='control-group'><div class='controls'>" +
                "<input type='text'  data-date-format='dd/mm/yyyy' id='txtfechai_m' class='span8' />" +
                "</div></div></div></div>" +
                "<div class='row-fluid'>" +
               "<div class='span4'><b>FECHA FIN:</b></div><div class='span4'><div class='control-group'><div class='controls'>" +
               "<input type='text'  data-date-format='dd/mm/yyyy' id='txtfechat_m' class='span8' />" +
               "</div></div></div></div>" +
                 "<div class='row-fluid'>" +
                "<div class='span4'><b>PORCENTAJE:</b></div><div class='span4'> <div class='control-group'><div class='controls'>" +
                "<input type='text' id='txtPorcentaje_m' class='span6' />" +
                " %</div></div></div></div>";
    var footerER = 
        '<button id="btngrDetalle" type="button" class="btn blue"><i class="icon-save"></i> Grabar</button>' +
        '<button class="btn" type="button" data-dismiss="modal"><i class="icon-remove"></i> Cancelar</button>';


    var existe = $("#modaleditarRegistro").html() == undefined ? true : false;


    crearmodal("modaleditarRegistro", "Editar Porcentaje de Detracción", bodyER,footerER);
  
    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfIndiceDetalle").val(row.INDICE);
    if (existe) {
        $("#modaleditarRegistro").css("width", "30%");
        existe &= false;
        ValidaPorcentaje('txtPorcentaje_m');
        inifechas("txtfechai_m", "txtfechat_m");
        $("#btngrDetalle").click(function () { CrearDetalle($("#txtfechai_m").val(), $("#txtfechat_m").val(), $("#txtPorcentaje_m").val(), $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfIndiceDetalle").val()); });
    }
    $("#txtfechai_m").val(row.FECHA_INICIO).attr("disabled",true);
        $("#txtfechat_m").val(row.FECHA_FIN);
        $("#txtPorcentaje_m").val(row.PORCENTAJE);
    
  

}

$("#btnEditar").click(function () { $("#modaleditarRegistro").modal("show"); });

function cargatablavacia() {

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

        oTableDetracciones_detalle = iniciaTabla('tblDetrDetalle', {
            data: null,
            columns: [
                {
                    data: "FECHA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')     
                    }
                },
                {
                    data: "FECHA_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "PORCENTAJE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
               
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        if (cellData == "ACTIVO") {
                            $(td).parent('tr').attr("style", "background-color:#EFE393;");
                        }
                    }
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort:false
        });

        $('#tblDetrDetalle').removeAttr('style');
        $('#tblDetrDetalle_filter').css('display', 'none');
    }

 function CargaTablaDetracciones_detalle(cod) {
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMDETR.ASHX?codigo=" + cod+"&flag=5",
            contentType: "application/json;",
            dataType: "json",
            async:false,
            success: function (datos) {

                if (datos != "" && datos != null) {
                
                    var json = datos;
               

                    oTableDetracciones_detalle.fnClearTable()


                    oTableDetracciones_detalle.fnAddData(json);

                   
                }
            }
        });
        cargaMenu();
 }

 function verDescripcion() {
     var texto = 'A cualquiera de las siguientes actividades comprendidas en la Clasificación Industrial              <br>' +
                 'Internacional Uniforme (CIIU) de las Naciones Unidas - Tercera revisión, siempre que no estén       <br>' +
                 'comprendidas en la definición de intermediación laboral y tercerización contenida en el presente    <br>' +
                 'anexo:                                                                                              <br>' +
                 '    a) Actividades jurídicas (7411).                                                                <br>' +
                 '    b) Actividades de contabilidad, teneduría de libros y auditoría; asesoramiento en materia de        ' +
                 'impuestos (7412).                                                                                   <br>' +
                 'c) Investigaciones de mercados y realización de encuestas de opinión pública (7413).                <br>' +
                 'd) Actividades de asesoramiento empresarial y en materia de gestión (7414).                         <br>' +
                 'e) Actividades de arquitectura e ingeniería y actividades conexas de asesoramiento técnico              ' +
                 '(7421).                                                                                             <br>' +
                 'f) Publicidad (7430).                                                                               <br>' +
                 'g) Actividades de investigación y seguridad (7492).                                                 <br>' +
                 'h) Actividades de limpieza de edificios (7493).                                                     <br>' +
                 'i) Actividades de envase y empaque (7495).                                                          <br>' +
                 'No están incluidos en este numeral los servicios prestados por operadores de comercio exterior a    <br>' +
                 'los sujetos que soliciten cualquiera de los regímenes o destinos aduaneros especiales o de          <br>' +
                 'excepción, siempre que tales servicios estén vinculados a operaciones de comercio exterior (*).     <br>' +
                 'Se considera operadores de comercio exterior:                                                       <br>' +
                 '1. Agentes marítimos y agentes generales de líneas navieras                                     <br>' +
                 '2. Compañías aéreas                                                                                 <br>' +
                 '3. Agentes de carga internacional                                                                   <br>' +
                 '4. Almacenes aduaneros                                                                              <br>' +
                 '5. Empresas de Servicio de Entrega Rápida                                                           <br>' +
                 '6. Agentes de aduana.                                                                               <br>' +
                 '(*) Exclusión aplicable a las operaciones cuyo nacimiento de la obligación tributaria se produzca a <br>' +
                 'partir del 14.07.2012, según Tercera Disposición Complementaria Final de la R.S. Nº 158-            <br>' +
                 '2012/SUNAT publicada el 13.07.2012';
     crearmodal("modalDescripcion", "Información", texto);
     $("#info_btnf").click(function () { $("#modalDescripcion").modal("show"); })
 }

var NCMDETR = function () {

   

    var CargarCombos = function() {

     
                $.ajaxSetup({ async: false });
                $.post("vistas/NC/ajax/NCMDETR.ASHX", { flag: 7},
                      function (res) {
                          if (res == "error") {
                              $("#slcTipoExistencia").select2("val", "");
                         
                          } else {
                       
                              $("#slcTipoExistencia").html(res);
                              $("#slcTipoExistencia").attr("disabled", false);
                          
                          }
                      });
                $.ajaxSetup({ async: true });
                $("#slcTipoExistencia").select2();

    }

    var cargainicial = function () {
        
       
        cargatablavacia();
       
        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $('#detalle_detraccion').removeAttr('style');

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMDETR.ASHX?codigo=" + cod+"&flag=6",
                contentType: "application/json;",
                dataType: "json",
                async:false,
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODIGO);


                    $("#slcAnexo").select2("val",datos[0].ANEXO);
                    $("#txtDefinicion").val(datos[0].DEFINICION);
                    $("#slcTipoExistencia").select2("val", datos[0].TIPO_EXISTENCIA_CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    $("#txt_info").val(datos[0].INFORMACION);

                    CargaTablaDetracciones_detalle(cod);
                                  },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }


    var plugins = function () {
            
        

        aMayuscula(":input");

        inifechas("txtfechai", "txtfechat");

        $("#slcAnexo").select2();

        $("#slcAnexo").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 3, "greedy": false }); });

        $("#txtDefinicion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false }); });

        ValidaPorcentaje('txtPorcentaje');

    }





    return {
        init: function () {
            plugins();
            CargarCombos();
            cargainicial();
            
            


        }
    };


}();