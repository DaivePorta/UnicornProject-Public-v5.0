<%@ WebHandler Language="VB" Class="NCMPOST" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMPOST : Implements IHttpHandler

    Dim pos As New Nomade.NC.NCPOS("BN")

    Dim dt As DataTable

    Dim res As String
    Dim sb As New StringBuilder()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Dim OPCION = context.Request("OPCION")

        Select Case OPCION
            Case "S"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim P_CODE As String = context.Request("P_CODE")
                dt = pos.ListarPOS(P_CODE, String.Empty, String.Empty, String.Empty, String.Empty)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        sb.Append("""CTLG"":""" & row("CTLG").ToString & """,")
                        sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                        sb.Append("""SCSL"":""" & row("SCSL").ToString & """,")
                        sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        sb.Append("""MARCA_MODELO"":""" & row("MARCA_MODELO").ToString & """,")
                        sb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                        sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        sb.Append("""PREDETERMINADO"":""" & row("PREDETERMINADO").ToString & """,")
                        sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "AGREGAR_OPERADOR"
                context.Response.ContentType = "text/plain"
                Dim POST_CODE As String = context.Request("POST_CODE")
                Dim OPTR_CODE As String = context.Request("OPTR_CODE")
                Dim USUA_ID As String = context.Request("USUA_ID")
                res = pos.InsertarOperadorPOS(POST_CODE, OPTR_CODE, USUA_ID)
            Case "ELIMINAR_OPERADOR"
                context.Response.ContentType = "text/plain"
                Dim CODIGO As String = context.Request("CODIGO")
                res = pos.EliminarOperadorPOS(CODIGO)
            Case "ASIGNAR_PRINCIPAL_OPERADOR"
                context.Response.ContentType = "text/plain"
                Dim CODIGO As String = context.Request("CODIGO")
                res = pos.AsignarPrincipalOperadorPOS(CODIGO)
            Case "LISTAR_OPERADORES"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim POST_CODE As String = context.Request("POST_CODE")
                dt = New Nomade.NC.NCPOS("BN").ListarOperadoresPOS(POST_CODE, "")
                sb.Append("[")
                If Not dt Is Nothing Then
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        sb.Append("""OPERADOR"":""" & row("OPTR_DESC").ToString & """,")
                        sb.Append("""NOMBRE_COMERCIAL"":""" & row("OPTR_NOMBRE_COMERCIAL").ToString & """,")
                        sb.Append("""ES_PRINCIPAL"":""" & row("ES_PRINCIPAL").ToString & """,")
                        sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                End If
                sb.Append("]")
                sb.Replace("[{}]", "[]")
                res = sb.ToString()
            Case "LOP"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim optr As New Nomade.NC.NCOperadorTarjeta("BN")
                dt = optr.ListarOperadorTarjeta(String.Empty, "A")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        sb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                        sb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                    res = sb.ToString()
                End If
            Case "G"
                context.Response.ContentType = "text/plain"
                Dim CTLG_CODE As String = context.Request("CTLG_CODE")
                Dim SCSL_CODE As String = context.Request("SCSL_CODE")
                Dim MARCA_MODELO As String = context.Request("MARCA_MODELO").ToUpper()
                Dim FECHA As String = Utilities.fechaLocal(context.Request("FECHA"))
                Dim P_DESCRIPCION As String = context.Request("P_DESCRIPCION").ToUpper()
                Dim SERIE As String = context.Request("SERIE").ToUpper()
                Dim TIPO As String = context.Request("TIPO")
                Dim OPERADOR_PIDM As String = context.Request("OPERADOR_PIDM")
                Dim ESTADO As String = context.Request("ESTADO")
                Dim USUA_ID As String = context.Request("USUA_ID")
                Dim PREDETERMINADO As String = context.Request("PREDETERMINADO")
                res = pos.CrearPOS(CTLG_CODE, SCSL_CODE, MARCA_MODELO, FECHA, P_DESCRIPCION, SERIE, TIPO, OPERADOR_PIDM, ESTADO + PREDETERMINADO, USUA_ID)
            Case "A"
                context.Response.ContentType = "text/plain"
                Dim P_CODE As String = context.Request("P_CODE")
                Dim CTLG_CODE As String = context.Request("CTLG_CODE")
                Dim SCSL_CODE As String = context.Request("SCSL_CODE")
                Dim MARCA_MODELO As String = context.Request("MARCA_MODELO").ToUpper()
                Dim FECHA As String = Utilities.fechaLocal(context.Request("FECHA"))
                Dim P_DESCRIPCION As String = context.Request("P_DESCRIPCION").ToUpper()
                Dim SERIE As String = context.Request("SERIE").ToUpper()
                Dim TIPO As String = context.Request("TIPO")
                Dim OPERADOR_PIDM As String = context.Request("OPERADOR_PIDM")
                Dim ESTADO As String = context.Request("ESTADO")
                Dim USUA_ID As String = context.Request("USUA_ID")
                Dim PREDETERMINADO As String = context.Request("PREDETERMINADO")
                res = pos.ActualizarPOS(P_CODE, CTLG_CODE, SCSL_CODE, MARCA_MODELO, FECHA, P_DESCRIPCION, SERIE, TIPO, OPERADOR_PIDM, ESTADO + PREDETERMINADO, USUA_ID)
            Case "AE"
                context.Response.ContentType = "text/plain"
                Dim P_CODE As String = context.Request("P_CODE")
                Dim USUA_ID As String = context.Request("USUA_ID")
                res = pos.CambiarEstadoPOS(P_CODE, USUA_ID)
        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class