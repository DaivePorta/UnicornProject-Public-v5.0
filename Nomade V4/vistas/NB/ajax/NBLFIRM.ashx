<%@ WebHandler Language="VB" Class="NBLFIRM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBLFIRM : Implements IHttpHandler
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim pidm_cuenta As String
    Dim codigo_cuenta As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "application/json; charset=utf-8"
        
        pidm_cuenta = context.Request("pidm_cue")
        codigo_cuenta = context.Request("cuenta_code")
        
        Try
            
            Dim P As New Nomade.NB.NBCheque("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarCheque(String.Empty, codigo_cuenta, pidm_cuenta, String.Empty, "E")

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""NUMERO_CHEQ"":""" & row("NUMERO_CHEQ").ToString & """,")
                    sb.Append("""NUMERO_CUENTA"":{""NOMBRE"":""" & row("NUMERO_CUENTA").ToString & """,""PIDM"":""" & row("CTA_PIDM").ToString & """,""CODIGO"":""" & row("CTA_CODE").ToString & """},")
                    sb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""FECHA_REGISTRO"":{""display"":""" & row("FECHA_REGISTRO").ToString & """,""order"":""" & String.Join("", row("FECHA_REGISTRO").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                    sb.Append("""TIPO"":{""NOMBRE"":""" & row("NTIPO").ToString & """,""CODIGO"":""" & row("TIPO").ToString & """},")
                    sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                    sb.Append("""FECHA"":{""display"":""" & row("FECHA").ToString & """,""order"":""" & String.Join("", row("FECHA").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""USUARIO"":""" & row("NUSUARIO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
                res = sb.ToString()
            Else
                res = ""
            End If
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class