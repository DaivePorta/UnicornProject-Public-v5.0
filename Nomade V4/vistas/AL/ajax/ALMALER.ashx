<%@ WebHandler Language="VB" Class="ALMALER" %>

Imports System
Imports System.Web
Imports System.Data

Public Class ALMALER : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    Dim opcion As String
    Dim codEmpresa As String
    Dim idAlerta As Integer
    Dim usuario As String
    Dim idParametroAlerta As Integer
    Dim valorParametro As String

    Dim oALAlertas As New Nomade.AL.ALAlertas("Bn")

    Dim dt As DataTable

    Dim resb As New StringBuilder
    Dim response As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        opcion = context.Request("opcion")
        codEmpresa = context.Request("codEmpresa")
        idAlerta = context.Request("idAlerta")
        usuario = context.Request("usuario")
        idParametroAlerta = context.Request("idParametroAlerta")
        valorParametro = context.Request("valorParametro")

        context.Response.ContentType = "text/plain"
        Select Case opcion
            Case "1"
                oALAlertas.AgregarUsuario(codEmpresa, idAlerta, usuario)
                response = "OK"
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = oALAlertas.ListarUsuarios(codEmpresa, idAlerta)
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                        resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                response = resb.ToString()
            Case "3"
                oALAlertas.EliminarUsuario(codEmpresa, idAlerta, usuario)
                response = "OK"
            Case "4"
                oALAlertas.AgregarValorParametro(codEmpresa, idAlerta, idParametroAlerta, valorParametro)
                response = "OK"
            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = oALAlertas.ListarValorParametro(codEmpresa, idAlerta)
                resb.Append("[")
                If Not (dt Is Nothing) Then
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""ID_ALERTA"":""" & row("IdAlerta").ToString & """,")
                        resb.Append("""ID_PARAMETRO"":""" & row("IdParametro").ToString & """,")
                        resb.Append("""COD_EMPRESA"":""" & row("CodEmpresa").ToString & """,")
                        resb.Append("""VALOR"":""" & row("Valor").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                End If
                resb.Append("]")
                resb.Replace("[{}]", "[]")
                response = resb.ToString()
        End Select
        context.Response.Write(response)

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class