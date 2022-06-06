<%@ WebHandler Language="VB" Class="Handler" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Handler : Implements IHttpHandler
    'Declaramos variables para usarlas en el proceso
    Dim flag, desc, corto, direc, ruc, usuario, activo, pidm, codelim, codigo,
        p_TIPO_FIRMA, p_FIRMANTES_OBLIG, p_FIRMANTES_PIDMS, p_FIRMANTES_OBLIG_IND,
        p_DETALLES_MIXTO, p_CTLG_CODE, cts_codex, p_ESTADO_IND, sUsuario As String

    Dim resb As New StringBuilder


    Dim dt, dt2 As DataTable
    Dim codrec As String
    'Instanciamos las clases de Persona
    Dim P As New Nomade.NC.NCEmpresa("Bn")
    Dim res As String
    Dim capital As String
    Dim participaciones As String
    Dim valor, tipo_regimen, tipo_regimen_lab As String
    Dim partida As String
    Dim empresa As String
    Dim diaCorte, topeAdelanto, bio_ind, bio_code As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Capturamos los valores que nos envia el formulario
        '======================================

        codrec = context.Request.QueryString("codigo")
        '-------------------------------'

        codelim = context.Request("codelim")
        flag = context.Request("flag")
        desc = context.Request("desc")
        corto = context.Request("corto")
        direc = context.Request("direc")
        ruc = context.Request("ruc")
        usuario = context.Request("usuario")
        activo = context.Request("activo")
        pidm = context.Request("pidm")
        codigo = context.Request("codigo")
        partida = context.Request("partida")
        capital = context.Request("capital")
        participaciones = context.Request("participaciones")
        valor = context.Request("valor")
        tipo_regimen = context.Request("tipo_regimen")
        tipo_regimen_lab = context.Request("tipo_regimen_lab")
        empresa = context.Request("empresa")
        diaCorte = context.Request("diaCorte")
        topeAdelanto = context.Request("topeAdelanto")
        bio_ind = context.Request("bio_ind")
        bio_code = context.Request("bio_code")
        cts_codex = context.Request("cts_codex")

        p_TIPO_FIRMA = context.Request("p_TIPO_FIRMA")
        p_FIRMANTES_OBLIG = context.Request("p_FIRMANTES_OBLIG")
        p_FIRMANTES_PIDMS = context.Request("p_FIRMANTES_PIDMS")
        p_FIRMANTES_OBLIG_IND = context.Request("p_FIRMANTES_OBLIG_IND")
        p_DETALLES_MIXTO = context.Request("p_DETALLES_MIXTO")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")

        context.Response.ContentType = "text/html"

        sUsuario = context.User.Identity.Name


        Try


            Select Case flag
                Case "0" 'lista empresas por permiso de uusuario
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = P.ListarEmpresa(String.Empty, p_ESTADO_IND, sUsuario)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "{}"
                    End If
                    context.Response.Write(res)
                Case "1"
                    res = CrearEmpresa(desc, corto, direc, ruc, pidm, activo, usuario, partida, capital, participaciones, valor, tipo_regimen, tipo_regimen_lab, cts_codex, diaCorte, topeAdelanto, bio_ind, bio_code) ' crear
                    context.Response.Write(res)

                Case "2"
                    res = ActualizarEmpresa(codigo, corto, usuario, direc, activo, partida, capital, participaciones, valor, tipo_regimen, tipo_regimen_lab, cts_codex,
                                            If(p_TIPO_FIRMA = Nothing, "", p_TIPO_FIRMA),
                                            If(p_FIRMANTES_OBLIG = Nothing, "0", p_FIRMANTES_OBLIG),
                                            If(p_FIRMANTES_PIDMS = Nothing, "", p_FIRMANTES_PIDMS),
                                            If(p_FIRMANTES_OBLIG_IND = Nothing, "", p_FIRMANTES_OBLIG_IND),
                                            If(p_DETALLES_MIXTO = Nothing, "", p_DETALLES_MIXTO), diaCorte, topeAdelanto, bio_ind, bio_code) ' actualizar
                    context.Response.Write(res)

                Case "3"
                    res = CambiarEstadoEmpresa(codelim) 'cambiar estado Inactivo/Activo
                    context.Response.Write(res)

                Case "4"
                    dt2 = P.ListarPerJur()
                    res = GenerarTablaPJ(dt2) 'tabla persona juridica
                    context.Response.Write(res)

                Case "5"
                    Dim P1 As New Nomade.NC.NCEAccionista("Bn")
                    dt2 = P1.ListarAccionista(0, String.Empty, codigo)
                    res = GenerarTablaAccionista(dt2) 'tabala persona juridica
                    context.Response.Write(res)

                Case "6"
                    Dim P1 As New Nomade.NC.NCEAccionista("Bn")
                    res = P1.EliminarAccionista(pidm, empresa)
                    context.Response.Write(res)

                Case "7"
                    Dim dt As New DataTable
                    dt = P.ListarEmpleadosAccionistas(p_CTLG_CODE, "0", "A")
                    res = GenerarTablaEmpleadosAccionistas(dt)
                    context.Response.Write(res)

                Case "LCTLG"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As New DataTable
                    dt = P.ListarEmpresaDatosBasicos(If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE), p_ESTADO_IND)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                    context.Response.Write(res)

                Case Else
                    If (codrec <> String.Empty) Then 'cargar los datos en formato json 

                        context.Response.ContentType = "application/json; charset=utf-8"
                        dt = P.ListarTotalEmpresa(codrec, String.Empty)
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                        resb.Append("""CORTO"" :" & """" & dt.Rows(0)("CORTO") & """,")
                        resb.Append("""DIRECCION"" :" & """" & dt.Rows(0)("DIRECCION") & """,")
                        resb.Append("""RUC"" :" & """" & dt.Rows(0)("RUC") & """,")
                        resb.Append("""PIDM"" :" & """" & dt.Rows(0)("PIDM") & """,")
                        resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                        resb.Append("""PARTIDA"" :" & """" & dt.Rows(0)("PARTIDA") & """,")
                        resb.Append("""CAPITAL"" :" & """" & dt.Rows(0)("CAPITAL") & """,")
                        resb.Append("""PARTICIPACIONES"" :" & """" & dt.Rows(0)("PARTICIPACIONES") & """,")
                        resb.Append("""AUTH"" :" & """" & dt.Rows(0)("AUTH") & """,")
                        resb.Append("""CODIGO_REGIMEN"" :" & """" & dt.Rows(0)("CODIGO_REGIMEN") & """,")
                        resb.Append("""CODIGO_REGIMEN_LAB"" :" & """" & dt.Rows(0)("CODIGO_REGIMEN_LAB") & """,")
                        resb.Append("""AUT_PIDMS"" :" & """" & dt.Rows(0)("AUT_PIDMS").ToString & """,")
                        resb.Append("""AUT_NOMBRES"" :" & """" & dt.Rows(0)("AUT_NOMBRES").ToString & """,")
                        resb.Append("""AUT_OBLIG_NRO"" :" & """" & dt.Rows(0)("AUT_OBLIG_NRO").ToString & """,")
                        resb.Append("""AUT_OBLIG_IND"" :" & """" & dt.Rows(0)("AUT_OBLIG_IND").ToString & """,")
                        resb.Append("""TIPO_FIRMA"" :" & """" & dt.Rows(0)("TIPO_FIRMA").ToString & """,")
                        resb.Append("""DIA_CORTE"" :" & """" & dt.Rows(0)("DIA_CORTE").ToString & """,")
                        resb.Append("""TOPE_ADEL"" :" & """" & dt.Rows(0)("TOPE_ADEL").ToString & """,")
                        resb.Append("""BIO_IND"" :" & """" & dt.Rows(0)("BIO_IND").ToString & """,")
                        resb.Append("""VALOR"" :" & """" & dt.Rows(0)("VALOR") & """,")
                        resb.Append("""BIO_CODE"" :" & """" & dt.Rows(0)("BIO_CODE").ToString & """,")
                        resb.Append("""TIPO_CONTRIBUYENTE"" :" & """" & dt.Rows(0)("TIPO_CONTRIBUYENTE").ToString & """,")
                        resb.Append("""CODIGO_CTS"" :" & """" & dt.Rows(0)("CODIGO_CTS").ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()


                        context.Response.Write(res)

                    End If

            End Select

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function CrearEmpresa(ByVal p_descripcion As String, ByVal corto As String, ByVal p_direccion As String, ByVal p_ruc As String, ByVal p_pidm As String, ByVal p_activo As String, ByVal p_usuario As String, ByVal p_partida As String, ByVal p_capital As String, ByVal p_participaciones As String, ByVal p_valor As String, ByVal tip_regi_renta As String, ByVal tip_regi_lab As String, ByVal cts_codex As String,
                                  dia_corte As String, tope_adelanto As String, p_bio_ind As String, ByVal p_bio_code As String) As String
        Dim datos As String
        datos = P.CrearEmpresa(p_descripcion, corto, p_direccion, p_ruc, p_pidm, p_activo, p_usuario, p_partida, p_capital, p_participaciones, p_valor, tip_regi_renta, tip_regi_lab, cts_codex, dia_corte, tope_adelanto, p_bio_ind, p_bio_code)
        Return datos
    End Function

    Public Function ActualizarEmpresa(ByVal p_codi As String, ByVal corto As String, ByVal p_usuario As String, ByVal p_direccion As String, ByVal p_activo As String, ByVal p_partida As String, ByVal p_capital As String, ByVal p_participaciones As String, ByVal p_valor As String, ByVal tip_regi_renta As String, ByVal tip_regi_lab As String, ByVal cts_codex As String,
                                      ByVal p_TIPO_FIRMA As String, ByVal p_FIRMANTES_OBLIG As String, ByVal p_FIRMANTES_PIDMS As String, ByVal p_FIRMANTES_OBLIG_IND As String, ByVal p_DETALLES_MIXTO As String, dia_corte As String, tope_adelanto As String, p_bio_ind As String, ByVal p_bio_code As String) As String
        Dim datos As String
        datos = P.ActualizarEmpresa(p_codi, corto, p_usuario, p_direccion, p_activo, p_partida, p_capital, p_participaciones, p_valor, tip_regi_renta, tip_regi_lab, cts_codex, p_TIPO_FIRMA, p_FIRMANTES_OBLIG, p_FIRMANTES_PIDMS, p_FIRMANTES_OBLIG_IND, p_DETALLES_MIXTO, dia_corte, tope_adelanto, p_bio_ind, p_bio_code)
        Return datos
    End Function

    Public Function CambiarEstadoEmpresa(ByVal cod As String) As String
        Dim datos As String
        datos = P.CambiarEstadoEmpresa(cod)
        Return datos
    End Function


    Public Function GenerarTablaPJ(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            resb.Append("<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">")
            resb.Append("<thead>")
            resb.Append("<tr align=""center"">")
            resb.Append("<th>PERSONA</th>")
            resb.Append("<th>RUC</th>")
            resb.Append("<th>DIRECCION</th>")
            resb.Append("</tr>")
            resb.Append("</thead>")
            resb.Append("<tbody>")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr id=""{0}"">", dt.Rows(i)("PIDM").ToString())
                resb.AppendFormat("<td id=""per{0}"">{1}</td>", dt.Rows(i)("PIDM").ToString(), dt.Rows(i)("persona").ToString())
                resb.AppendFormat("<td id=""ruc{0}"">{1}</td>", dt.Rows(i)("PIDM").ToString(), dt.Rows(i)("ruc").ToString())
                resb.AppendFormat("<td id=""dir{0}"">{1}</td>", dt.Rows(i)("PIDM").ToString(), dt.Rows(i)("direccion").ToString())
                resb.AppendFormat("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table>")
            res = resb.ToString

        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function

    Public Function GenerarTablaEmpleadosAccionistas(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            resb.Append("<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">")
            resb.Append("<thead>")
            resb.Append("<tr align=""center"">")
            resb.Append("<th>PERSONA</th>")
            resb.Append("<th>DIRECCION</th>")
            resb.Append("</tr>")
            resb.Append("</thead>")
            resb.Append("<tbody>")
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr id='{0}'>", dt.Rows(i)("PIDM").ToString())
                resb.AppendFormat("<td id=""PER{0}"">{1}</td>", dt.Rows(i)("PIDM").ToString(), dt.Rows(i)("PERSONA").ToString())
                resb.AppendFormat("<td id=""FE{0}"">{1}</td>", dt.Rows(i)("PIDM").ToString(), dt.Rows(i)("DIRECCION").ToString())
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table>")
            res = resb.ToString
        Else
            res = "No se encontraron datos!!!"
        End If

        Return res
    End Function

    Public Function GenerarTablaAccionista(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<br><h5 ALIGN=""CENTER""><b>TABLA DE ACCIONISTAS</b></h5><table id=""tblaccionista"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>ACCIONISTA</th>"
            res += "<th>APORTE (%)</th>"
            res += "<th>MONTO</th>"
            res += "<th></th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("PIDM").ToString() & """>"
                res += "<td id=""acc" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("persona").ToString() & "</td>"
                res += "<td align=""center"" id=""apo" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("porcentaje").ToString() & "</td>"
                res += "<td id=""mon" & dt.Rows(i)("PIDM").ToString() & """></td>"
                res += "<td><i class=""icon-remove btnElimAcci"" title=""Eliminar Accionista"" style = ""color: red;""><i/></td>"
                res += "</tr>"

            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = ""
        End If
        Return res
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property





End Class