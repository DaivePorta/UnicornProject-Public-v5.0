<%@ WebHandler Language="VB" Class="NSMUSUA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMUSUA : Implements IHttpHandler

    Dim OPCION As String

    Dim PIDM As Integer
    Dim ID, CLAVE, EMPLEADO_IND, FECHA_INICIO, FECHA_LIMITE, ESTADO_IND, USUA_ID, EMAIL As String

    Dim CARG_CODE As String
    Dim CTLG_CODE As String
    Dim ROLC_CODE As String
    Dim SCSL_CODE As String

    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim CODE, HORA_INICIO, HORA_FIN, LUNES_IND, MARTES_IND,
       MIERCOLES_IND, JUEVES_IND, VIERNES_IND, SABADO_IND,
       DOMINGO_IND, ZOHO_CODE As String
    Dim HORARIO_EMPLEADO As String
    Dim INCLUIR_FERIADOS As String
    Dim USUARIO_ID As String
    Dim ESTADO_IF_IND, ESTADO_HE_IND As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        ID = context.Request("ID")
        PIDM = context.Request("PIDM")
        CLAVE = context.Request("CLAVE")
        EMPLEADO_IND = context.Request("EMPLEADO_IND")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_LIMITE = context.Request("FECHA_LIMITE")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        ESTADO_IF_IND = context.Request("ESTADO_IF_IND")

        CARG_CODE = context.Request("CARG_CODE")

        CTLG_CODE = context.Request("CTLG_CODE")

        ROLC_CODE = context.Request("ROLC_CODE")

        SCSL_CODE = context.Request("SCSL_CODE")

        USUARIO_ID = context.Request("USUARIO_ID")
        HORARIO_EMPLEADO = context.Request("HORARIO_EMPLEADO")
        INCLUIR_FERIADOS = context.Request("INCLUIR_FERIADOS")
        HORA_INICIO = context.Request("HORA_INICIO")
        HORA_FIN = context.Request("HORA_FIN")
        LUNES_IND = context.Request("LUNES_IND")
        MARTES_IND = context.Request("MARTES_IND")
        MIERCOLES_IND = context.Request("MIERCOLES_IND")
        JUEVES_IND = context.Request("JUEVES_IND")
        VIERNES_IND = context.Request("VIERNES_IND")
        SABADO_IND = context.Request("SABADO_IND")
        DOMINGO_IND = context.Request("DOMINGO_IND")
        ZOHO_CODE = context.Request("ZOHO_CODE")
        CODE = context.Request("CODE")

        ESTADO_HE_IND = context.Request("ESTADO_HE_IND")
        EMAIL = context.Request("EMAIL")

        Select Case OPCION

            Case "CE"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CambiarEstadoUsuario(USUA_ID)
                u = Nothing
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuario_Persona(PIDM)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE_PERSONA").ToString & """")

                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                u = Nothing

            Case "EMAIL"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.Listar_Correos(PIDM)
                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                End If
                u = Nothing

            Case "CU"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_LIMITE.Equals(String.Empty) Then
                    FECHA_LIMITE = Utilities.fechaLocal(FECHA_LIMITE)
                End If
                res = u.CrearUsuario(ID, CLAVE, PIDM, EMPLEADO_IND, FECHA_INICIO, FECHA_LIMITE, ESTADO_IND, USUA_ID, EMAIL)
                u = Nothing
            Case "RU"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuario(String.Empty, String.Empty, ID, String.Empty)
                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                End If
                u = Nothing
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim c As New Nomade.NS.NSCargos("Bn")
                dt = c.ListarCargo(String.Empty, "A", String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                c = Nothing
            Case "AU"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_LIMITE.Equals(String.Empty) Then
                    FECHA_LIMITE = Utilities.fechaLocal(FECHA_LIMITE)
                End If
                res = u.ActualizarUsuario(ID, CLAVE, PIDM, EMPLEADO_IND, FECHA_INICIO, FECHA_LIMITE, ESTADO_IND, USUA_ID, EMAIL)
                u = Nothing
                '--------------------------03/09/14  
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NS.NSUsuario("Bn")
                dt = dh.listarHorarioUsuario(CODE, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE") & """,")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID") & """,")
                        resb.Append("""HORA_EMPL_IND"" :" & """" & MiDataRow("HORA_EMPL_IND") & """,")
                        resb.Append("""INCLUIR_FERIADOS_IND"" :" & """" & MiDataRow("INCLUIR_FERIADOS_IND") & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("HORA_INICIO") & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("HORA_FIN") & """,")
                        resb.Append("""LUNES_IND"" :" & """" & MiDataRow("LUNES_IND") & """,")
                        resb.Append("""NLUNES_IND"" :" & """" & MiDataRow("NLUNES_IND") & """,")
                        resb.Append("""MARTES_IND"" :" & """" & MiDataRow("MARTES_IND") & """,")
                        resb.Append("""NMARTES_IND"" :" & """" & MiDataRow("NMARTES_IND") & """,")
                        resb.Append("""MIERCOLES_IND"" :" & """" & MiDataRow("MIERCOLES_IND") & """,")
                        resb.Append("""NMIERCOLES_IND"" :" & """" & MiDataRow("NMIERCOLES_IND") & """,")
                        resb.Append("""JUEVES_IND"" :" & """" & MiDataRow("JUEVES_IND") & """,")
                        resb.Append("""NJUEVES_IND"" :" & """" & MiDataRow("NJUEVES_IND") & """,")
                        resb.Append("""VIERNES_IND"" :" & """" & MiDataRow("VIERNES_IND") & """,")
                        resb.Append("""NVIERNES_IND"" :" & """" & MiDataRow("NVIERNES_IND") & """,")
                        resb.Append("""SABADO_IND"" :" & """" & MiDataRow("SABADO_IND") & """,")
                        resb.Append("""NSABADO_IND"" :" & """" & MiDataRow("NSABADO_IND") & """,")
                        resb.Append("""DOMINGO_IND"" :" & """" & MiDataRow("DOMINGO_IND") & """,")
                        resb.Append("""NDOMINGO_IND"" :" & """" & MiDataRow("NDOMINGO_IND") & """,")
                        resb.Append("""ZOHO_CODE"" :" & """" & MiDataRow("ZOHO_CODE") & """,")
                        resb.Append("""NZOHO_CODE"" :" & """" & MiDataRow("NZOHO_CODE") & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing

            Case "GD" 'graba detalle horario
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CrearHorarioUsuario(USUARIO_ID, HORARIO_EMPLEADO, INCLUIR_FERIADOS, HORA_INICIO, HORA_FIN, LUNES_IND, MARTES_IND, MIERCOLES_IND, JUEVES_IND, VIERNES_IND, SABADO_IND, DOMINGO_IND, ZOHO_CODE, ESTADO_IND, USUA_ID)
                u = Nothing

            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEmpresa("Bn")
                If USUA_ID.ToUpper() = "ADMINSIS" Then
                    dt = e.ListarTotalEmpresa(String.Empty, "A")
                Else
                    dt = e.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                End If

                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                e = Nothing
                res = resb.ToString()
            Case "5"

                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuarioPermiso(ID, CTLG_CODE, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""CARG_CODE"" :" & """" & MiDataRow("CARG_CODE").ToString & """,")
                        resb.Append("""ROLC_CODE"" :" & """" & MiDataRow("ROLC_CODE").ToString & """,")
                        resb.Append("""NROLC_CODE"" :" & """" & MiDataRow("NROLC_CODE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                u = Nothing
                res = resb.ToString()
            Case "CUP"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CrearUsuarioPermiso(ID, CTLG_CODE, CARG_CODE, ROLC_CODE, ESTADO_IND, USUA_ID)
                u = Nothing
            Case "6"
                context.Response.ContentType = "application/json; charset=utf-8"

                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuarioRol(ID, CTLG_CODE, CARG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCR").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                u = Nothing
                res = resb.ToString()
            Case "CEUP"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.ActualizarUsuarioPermiso(ID, CTLG_CODE, CARG_CODE, ROLC_CODE, ESTADO_IND, USUA_ID)
                u = Nothing
            Case "CEUC"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.ActualizarUsuarioCorporativo(ID, SCSL_CODE, ESTADO_IND, USUA_ID, CTLG_CODE)
                u = Nothing
            Case "7"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuarioEmpresa(ID, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""NCTLG_CODE"" :" & """" & MiDataRow("NCTLG_CODE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                u = Nothing
                res = resb.ToString()
            Case "8"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuarioEstablecimiento(ID, CTLG_CODE, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCR"" :" & """" & MiDataRow("DESCR").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                u = Nothing
                res = resb.ToString()
            Case "CUE"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CrearUsuarioCorporativo(ID, CTLG_CODE, SCSL_CODE, ESTADO_IND, USUA_ID)
                u = Nothing
            Case "9"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.listarUsuarioCorporativo(ID, CTLG_CODE, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""NSCSL_CODE"" :" & """" & MiDataRow("NSCSL_CODE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                u = Nothing
                res = resb.ToString()

            Case "ZH"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim z As New Nomade.NC.NCZonaHoraria("Bn")
                dt = z.Listar_ZonaHoraria(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Zona_horaria").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                z = Nothing

            Case "IF"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CrearHorarioUsuarioFeriados(USUARIO_ID, ESTADO_IF_IND)
                u = Nothing

            Case "HE"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.CrearHorarioUsuarioCempleado(USUARIO_ID, ESTADO_HE_IND, CTLG_CODE)
                u = Nothing

            Case "EE"
                context.Response.ContentType = "text/html"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                res = u.EliminarHorarioUsuario(CODE, USUARIO_ID)
                u = Nothing

            Case "10"
                Dim p As New Nomade.NS.NSCargos("Bn")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarCargo(CODE, "A", String.Empty)
                res = dt.Rows(0)("DETALLE")
            Case "DATOS_USUA"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim u As New Nomade.NS.NSUsuario("Bn")
                dt = u.fnListarDatosUsuario(ID, String.Empty)
                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                End If
                u = Nothing
            Case Else

        End Select

        context.Response.Write(res)

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class