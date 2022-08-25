<%@ WebHandler Language="VB" Class="CAMASCR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMASCR : Implements IHttpHandler

    Dim res, opcion, codigo, usua_id, ctlg_code, scsl_code, pidm, activo,
        glosa, moneda, monto, fecha_asignacion, fecha_limite, centro_costos, cecc_code,
        estado, tipo, codigos, finicio, ffin, asig_code, mone_code, mone_caja,
        mont_caja, caja_code, tipo_camb, pidm_empl, monto_dolares, text_comp,
        caja_tipo, codigo_apertura, devolver, monto_asig, usuarios As String

    Dim dt As DataTable
    Dim p As New Nomade.CA.AsignacionCuenta("Bn")
    Dim f As New Nomade.CA.AsignacionFondo("Bn")
    Dim l As New Nomade.CA.CAConcepto("Bn")
    Dim d As New Nomade.NC.NCTipoDC("Bn")
    Dim i As New Nomade.NC.NCDocumentoIdentidad("Bn")
    Dim q As New Nomade.NC.NCCuenta("Bn")
    Dim k As New Nomade.NC.NCCaja("Bn")

    Dim resClase As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        codigo = context.Request("codigo")
        ctlg_code = context.Request("ctlg_code")
        scsl_code = context.Request("scsl_code")
        pidm = context.Request("pidm")
        activo = context.Request("activo")
        glosa = vChar(context.Request("glosa"))
        moneda = context.Request("moneda")
        monto = context.Request("monto")
        monto_asig = context.Request("monto_asig")
        devolver = context.Request("devolver")
        fecha_asignacion = context.Request("fecha_asignacion")
        fecha_limite = context.Request("fecha_limite")
        centro_costos = context.Request("centro_costos")
        cecc_code = context.Request("centro_cecc")
        codigo_apertura = context.Request("codigo_apertura")
        estado = context.Request("estado")
        usua_id = context.Request("usua_id")
        tipo = context.Request("tipo")
        codigos = context.Request("seleccionados")

        usuarios = context.Request("usuarios")

        finicio = context.Request("finicio")
        ffin = context.Request("ffin")
        asig_code = context.Request("asig_code")
        mone_code = context.Request("mone_code")
        mone_caja = context.Request("mone_caja")
        mont_caja = context.Request("mont_caja")
        caja_code = context.Request("caja_code")
        tipo_camb = context.Request("tipo_camb")
        pidm_empl = context.Request("pidm_empl")
        monto_dolares = context.Request("monto_dolares")
        text_comp = context.Request("text_comp")
        caja_tipo = context.Request("tipo_caja")

        Try
            Select Case opcion
                Case "1"
                    resClase = p.CrearAsignacion(ctlg_code, scsl_code, pidm, activo, glosa, moneda, monto, Utilities.fechaLocal(fecha_asignacion), Utilities.fechaLocal(fecha_limite), _
                                                 centro_costos, cecc_code, estado, usua_id)

                    res = resClase
                Case "2"
                    resClase = p.ActualizarAsignacion(codigo, ctlg_code, scsl_code, pidm, activo, glosa, moneda, monto, Utilities.fechaLocal(fecha_asignacion), Utilities.fechaLocal(fecha_limite), _
                                                 centro_costos, cecc_code, estado, usua_id)
                    res = resClase
                Case "3"
                    dt = p.ListarAsignacion("", ctlg_code, scsl_code, estado)
                    res = ListaProductosHtml(dt)
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarAsignacion(codigo, ctlg_code, scsl_code, estado)
                    Dim resb As New StringBuilder
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODE") & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & dt.Rows(0)("SCSL_CODE") & """,")
                        resb.Append("""PIDM"" :" & """" & dt.Rows(0)("PIDM") & """,")
                        resb.Append("""EMPLEADO"" :" & """" & dt.Rows(0)("EMPLEADO") & """,")
                        resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ACTIVO") & """,")
                        resb.Append("""GLOSA"" :" & """" & dt.Rows(0)("GLOSA") & """,")
                        resb.Append("""MONE_CODE"" :" & """" & dt.Rows(0)("MONE_CODE") & """,")
                        resb.Append("""MONTO"" :" & """" & dt.Rows(0)("MONTO") & """,")
                        resb.Append("""FECHA_REGISTRO"" :" & """" & dt.Rows(0)("FECHA_REGISTRO") & """,")
                        resb.Append("""FECHA_LIMITE"" :" & """" & dt.Rows(0)("FECHA_LIMITE") & """,")
                        resb.Append("""CENTRO_COSTO"" :" & """" & dt.Rows(0)("CENTRO_COSTO") & """,")
                        resb.Append("""CECC_CODE"" :" & """" & dt.Rows(0)("CECC_CODE") & """,")
                        resb.Append("""CECD_CODE"" :" & """" & dt.Rows(0)("CECD_CODE") & """,")
                        resb.Append("""USUA_APROBACION"" :" & """" & dt.Rows(0)("USUA_APROBACION") & """,")
                        resb.Append("""FECHA_APROBACION"" :" & """" & dt.Rows(0)("FECHA_APROBACION") & """,")
                        resb.Append("""FECHA_PAGO"" :" & """" & dt.Rows(0)("FECHA_PAGO") & """,")
                        resb.Append("""CAJA_PAGO"" :" & """" & dt.Rows(0)("CAJA_PAGO") & """,")
                        resb.Append("""FECHA_RENDICION"" :" & """" & dt.Rows(0)("FECHA_RENDICION") & """,")
                        resb.Append("""CAJA_RENDICION"" :" & """" & dt.Rows(0)("CAJA_RENDICION") & """,")
                        resb.Append("""PROGRESO"" :" & """" & dt.Rows(0)("PROGRESO") & """,")
                        resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[{}]"
                    End If
                Case "5"
                    dt = p.ListarAsignacion("", ctlg_code, scsl_code, estado)
                    res = ListaProductosHtml1(dt)
                Case "6"
                    res = p.AprobarRechazarAsignacion(tipo, ctlg_code, scsl_code, codigos, caja_code, pidm, usua_id, "0100")

                    If res = "OK" Then
                        Dim arr_users, arr_codigos As Array
                        Dim nOTIF As New NomadeHub
                        Dim i As Integer
                        If Not usuarios Is Nothing And Not codigos Is Nothing Then
                            arr_users = usuarios.Split(",")
                            arr_codigos = codigos.Split(",")
                            For i = 0 To arr_users.Length
                                Try
                                    nOTIF.enviarNotificacion(arr_users(i), "ASG", "La asignacion " & arr_codigos(i) & " ha sido aprobada y esta lista para ser cobrada", "#", usua_id, arr_codigos(i))
                                    i += 1
                                Catch ex As Exception
                                    i += 1
                                End Try
                            Next
                        End If
                    End If

                Case "7"
                    dt = p.ListarAsignacionesAprobadas(ctlg_code, scsl_code, estado, Utilities.fechaLocal(finicio), Utilities.fechaLocal(ffin), pidm)
                    res = ListaProductosHtml2(dt)
                Case "8" 'CAMRENC: LISTAR ASIGNACIONES PAGADAS O VENCIDAS PARA PODER RENDIR CUENTAS
                    dt = p.ListarAsignacionesAprobadasPersona(ctlg_code, scsl_code, estado, pidm)
                    res = GenerarTablaAsignaciones(dt)
                Case "9" ' SELECT PARA COMPROBANTE EN RENDICION DE CUENTA
                    dt = New Nomade.NC.NCTipoDCEmpresa("Bn").Listar_Tipo_dcto_emite("", ctlg_code, "", "A", "", "S")
                    res = GeneraComboComprobantes(dt)
                Case "10"
                    dt = i.ListarDOCUMENTOS_IDENTIDAD(String.Empty, "A", String.Empty)
                    res = GeneraComboDocumentos(dt)
                Case "11"
                    dt = q.Listar_cuentas(ctlg_code, String.Empty, String.Empty)
                    res = GeneraComboCuentas(dt)
                Case "12"
                    dt = k.ListarCajasAperturadas("", ctlg_code, scsl_code, "", "A")
                    res = GeneraComboCajas(dt)
                Case "13" 'CAMRENC: COMPLETAR RENDICION DE CUENTAS

                    res = p.GrabarRendicionCuenta(ctlg_code, scsl_code, asig_code, text_comp, mone_code, caja_code, monto_asig, "S", devolver, usua_id)

                    If res = "EXITO" Then
                        res = p.RendirCuentaAsignacion(ctlg_code, scsl_code, asig_code, text_comp, mone_code, mont_caja, caja_code, usua_id,
                                                 tipo_camb, pidm_empl, codigo_apertura, "0100", monto)

                    End If

                Case "14" 'CAMRENC: SOLO GRABAR RENDICION DE CUENTAS
                    res = p.GrabarRendicionCuenta(ctlg_code, scsl_code, asig_code, text_comp, mone_code, caja_code, monto_asig, "N", devolver, usua_id)

                    If res = "EXITO" Then
                        'enviar notificacion a el usuario que va a aprobar

                    End If
                Case "15" ' Lista de documentos para tabla de rendicion de cuentas

                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim resb As New StringBuilder
                    dt = p.ListarRendicionTipo(asig_code)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""LINK_QUITAR"" :" & """" & "<a data-mode='new' class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i>&nbsp;</a>" & """,")
                            resb.Append("""LINK_EDITAR"" :" & """" & "<a class='edit btn yellow' href='javascript:;'><i class='icon-pencil'></i>&nbsp;</a>" & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""PIDM_EMPL"" :" & """" & MiDataRow("PIDM_EMPL").ToString & """,")
                            resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMPLEADO").ToString & """,")
                            resb.Append("""ASIG_CODE"" :" & """" & MiDataRow("ASIG_CODE").ToString & """,")
                            resb.Append("""DEVOLVER"" :" & """" & MiDataRow("DEVOLVER").ToString & """,")
                            resb.Append("""GLOSA_ASIG"" :" & """" & MiDataRow("GLOSA_ASIG").ToString & """,")
                            resb.Append("""MONE_ASIG"" :" & """" & MiDataRow("MONE_ASIG").ToString & """,")
                            resb.Append("""MONTO_ASIG"" :" & """" & MiDataRow("MONTO_ASIG").ToString & """,")
                            resb.Append("""FECHA_EMISION"" :" & """" & MiDataRow("FECHA_EMISION").ToString.Substring(0, 10) & """,")
                            resb.Append("""DCTO_CODE"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""DESC_CONCEPTO"" :" & """" & MiDataRow("DESC_CONCEPTO").ToString & """,")
                            resb.Append("""DESC_SUBCONCEPTO"" :" & """" & MiDataRow("DESC_SUBCONCEPTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""PERSONA"" :" & """" & MiDataRow("PERSONA").ToString & """,")
                            resb.Append("""COMPRAS_IND"" :" & """" & MiDataRow("COMPRAS_IND").ToString & """,")
                            resb.Append("""TOTAL"" :" & """" & MiDataRow("TOTAL").ToString & """,")
                            resb.Append("""CONCEPTO"" :" & """" & MiDataRow("CONCEPTO").ToString & """,")
                            resb.Append("""SUBCONCEPTO"" :" & """" & MiDataRow("SUBCONCEPTO").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""COMPLETO_IND"" :" & """" & MiDataRow("COMPLETO_IND").ToString & """,")
                            resb.Append("""CAJA_CODE"" :" & """" & MiDataRow("CAJA_CODE").ToString & """,")
                            resb.Append("""CENTRO_COSTO"" :" & """" & MiDataRow("CENTRO_COSTO").ToString & """,")
                            resb.Append("""DESC_TIPO_BIEN"" :" & """" & MiDataRow("DESC_TIPO_BIEN").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""DESC_PERIODO"" :" & """" & MiDataRow("DESC_PERIODO").ToString & """,")
                            resb.Append("""PERIODO"" :" & """" & MiDataRow("PERIODO").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    dt = Nothing
                    res = resb.ToString()
                Case "16"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim resb As New StringBuilder
                    dt = p.ListarRendicionesCuentas(ctlg_code, scsl_code, estado)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString.Substring(0, 10) & """,")
                            resb.Append("""FECHA_LIMITE"" :" & """" & MiDataRow("FECHA_LIMITE").ToString.Substring(0, 10) & """,")
                            resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMPLEADO").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""RENDIDO"" :" & """" & MiDataRow("RENDIDO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """,")
                            resb.Append("""COMPLETO"" :" & """" & MiDataRow("COMPLETO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    dt = Nothing
                    res = resb.ToString()
                Case "N"

                    ''Notificar a RGUERRA
                    'Dim nOTIF As New NomadeHub
                    'nOTIF.enviarNotificacion("RGUERRA", "ASG", "La asignacion T00000008 ha sido aprobada y esta lista para ser cobrada", "?f=NFMRECE", "ADMINSIS", "T00000008")

            End Select

            p = Nothing
            d = Nothing
            i = Nothing
            k = Nothing
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.Message)
        End Try

    End Sub

    Public Function ListaProductosHtml(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>ID</th>"
            res += "<th align='center'>EMPLEADO</th>"
            res += "<th align='center'>GLOSA</th>"
            res += "<th align='center'>MONEDA</th>"
            res += "<th align='center'>MONTO</th>"
            res += "<th align='center'>CENTRO DE COSTO</th>"
            res += "<th align='center'>FECHA REGISTRO</th>"
            res += "<th align='center'>FECHA LIMITE</th>"
            res += "<th align='center'>FECHA APROBACION</th>"
            res += "<th align='center'>FECHA PAGO</th>"
            res += "<th align='center'>FECHA RENDICION</th>"
            res += "<th align='center'>ESTADO</th>"
            res += "<th align='center'>ACTIVO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='left'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("EMPLEADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONEDA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res += "<td align='center' data-order='" + (ObtenerFecha(dt.Rows(i)("FECHA_REGISTRO").ToString())) + "'>" & dt.Rows(i)("FECHA_REGISTRO").ToString().Substring(0, 10) & "</td>"
                res += "<td align='center' data-order='" + (ObtenerFecha(dt.Rows(i)("FECHA_LIMITE").ToString())) + "'>" & dt.Rows(i)("FECHA_LIMITE").ToString().Substring(0, 10) & "</td>"
                res += "<td align='center' data-order='" + (ObtenerFecha(dt.Rows(i)("FECHA_APROBACION").ToString())) + "'>" & dt.Rows(i)("FECHA_APROBACION").ToString() & "</td>"
                res += "<td align='center' data-order='" + (ObtenerFecha(dt.Rows(i)("FECHA_PAGO").ToString())) + "'>" & dt.Rows(i)("FECHA_PAGO").ToString() & "</td>"
                res += "<td align='center' data-order='" + (ObtenerFecha(dt.Rows(i)("FECHA_RENDICION").ToString())) + "'>" & dt.Rows(i)("FECHA_RENDICION").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DES_ESTADO").ToString() & "</td>"
                res += "<td align='center'>" & IIf(dt.Rows(i)("ACTIVO").ToString() = "S", "SI", "NO") & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table id='tblAsignacion' class='display DTTT_selectable bordered' style='display: none;'><thead>" &
                "<tr><th>ID</th><th>EMPLEADO</th><th>GLOSA</th>" &
                "<th>MONEDA</th><th>MONTO</th><th>CENTRO DE COSTO</th><th>FECHA REGISTRO</th>" &
                "<th>FECHA LIMITE</th><th>FECHA APROBACION</th><th>FECHA PAGO</th><th>FECHA RENDICION</th><th>ESTADO</th><th>ACTIVO</th></tr>" &
                    "</thead></table>"
        End If
        Return res
    End Function

    Public Function ListaProductosHtml1(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>#</th>"
            res += "<th align='center'>EMPLEADO</th>"
            res += "<th align='center'>GLOSA</th>"
            res += "<th align='center'>CENTRO DE COSTO</th>"
            res += "<th align='center'>MONEDA</th>"
            res += "<th align='center'>MONTO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='left'><input type='checkbox' class='check' data-user='" & dt.Rows(i)("USUARIO_SOLICITA").ToString & "' id='" & dt.Rows(i)("CODE").ToString() & "'/></td>"
                res += "<td align='left'>" & dt.Rows(i)("EMPLEADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONEDA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table id='tblAsignacion' class='display DTTT_selectable' border='0' style='display: none;'><thead>" &
                "<tr><th>#</th><th>EMPLEADO</th><th>GLOSA</th>" &
                "<th>CENTRO DE COSTO</th><th>MONEDA</th><th>MONTO</th>" &
                "</thead></table>"
        End If
        Return res
    End Function

    Public Function ListaProductosHtml2(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered' style='OVERFLOW-X: scroll;'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>EMPLEADO</th>"
            res += "<th align='center'>GLOSA</th>"
            res += "<th align='center'>CENTRO DE COSTO</th>"
            res += "<th align='center'>MONEDA</th>"
            res += "<th align='center'>MONTO</th>"
            res += "<th align='center'>APROBADO POR</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='left'>" & dt.Rows(i)("EMPLEADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONEDA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("USUA_APROBACION").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table id='tblAsignacion' class='display DTTT_selectable' border='0' style='display: none;'><thead>" &
                "<tr><th>EMPLEADO</th><th>GLOSA</th>" &
                "<th>CENTRO DE COSTO</th><th>MONEDA</th><th>MONTO</th><th>APROBADO POR</th>" &
                "</thead></table>"
        End If
        Return res
    End Function

    Public Function GenerarTablaAsignaciones(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>GLOSA</th>"
            res += "<th>MONEDA</th>"
            res += "<th>MONTO</th>"
            res += "<th>CENTRO DE COSTO</th>"
            res += "<th>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("CODE").ToString() & """>"
                res += "<td id=""gl" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td name=""" & dt.Rows(i)("MONE_CODE").ToString() & """ &  id=""mn" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("MONEDA").ToString() & "</td>"
                res += "<td id=""mo" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "<td id=""cc" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res += "<td id=""es" & dt.Rows(i)("CODE").ToString() & """>" & dt.Rows(i)("DES_ESTADO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function

    Public Function GeneraComboComprobantes(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cbocomprobante' name='cbocomprobante' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'>"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option tipoDoc = '" & dt.Rows(i)("TIPO_DOC").ToString() & "' compras = '" & dt.Rows(i)("REG_COMPRA_IND").ToString() & "'  value='" & dt.Rows(i)("DCTO_CODE").ToString() & "'>" & dt.Rows(i)("DCTO_DESC_CORTA").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cbocomprobante' name='cbocomprobante' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'>"
            res += "</select>"
        End If
        Return res
    End Function

    Public Function GeneraComboDocumentos(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cbodocumento' name='cbodocumento' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'  style='width:70px;'>"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option value='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("DESC_CORTA").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cbodocumento' name='cbodocumento' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'  style='width:70px;'>"
            res += "<option></option>"
            res += "</select>"
        End If
        Return res
    End Function

    Public Function GeneraComboCuentas(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cbocuentas' name='cbocuentas' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'  style='width:70px;'>"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option value='" & dt.Rows(i)("cod_cuenta").ToString() & "'>" & dt.Rows(i)("cod_cuenta").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cbodocumento' name='cbodocumento' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'  style='width:70px;'>"
            res += "<option></option>"
            res += "</select>"
        End If
        Return res
    End Function

    Public Function GeneraComboCajas(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cbocajas' name='cbocajas' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option value='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cbocajas' name='cbocajas' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'"
            res += "<option></option>"
            res += "</select>"
        End If
        Return res
    End Function

    Public Function GeneraComboCajas1(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cbocajac' name='cbocajac' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option value='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cbocajac' name='cbocajac' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'"
            res += "<option></option>"
            res += "</select>"
        End If
        Return res
    End Function

    Public Function GeneraComboConceptos(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<select id='cboconceptos' name='cboconceptos' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'>"
            res += "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option value='" & dt.Rows(i)("CODIGO").ToString() & "' desc-corta=''>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "<select id='cboconceptos' name='cboconceptos' class='combo m-wrap span12 required' data-placeholder='Seleccionar' tabindex='1'>"
            res += "</select>"
        End If
        Return res
    End Function

    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        If fecha <> "" Then
            Dim dia = fecha.Split(" ")(0).Split("/")(0)
            Dim mes = fecha.Split(" ")(0).Split("/")(1)
            Dim anio = fecha.Split(" ")(0).Split("/")(2)
            Dim hora = ""
            Dim min = ""
            Dim seg = ""
            If fecha.Split(" ").Length = 3 Then
                hora = fecha.Split(" ")(1).Split(":")(0)
                min = fecha.Split(" ")(1).Split(":")(1)
                seg = fecha.Split(" ")(1).Split(":")(2)
                If fecha.Split(" ")(2).Contains("p") Then
                    If Integer.Parse(hora) < 12 Then
                        hora = (Integer.Parse(hora) + 12).ToString
                    End If
                End If
            End If
            fecha = anio + mes + dia + hora + min + seg
        End If
        Return fecha
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class