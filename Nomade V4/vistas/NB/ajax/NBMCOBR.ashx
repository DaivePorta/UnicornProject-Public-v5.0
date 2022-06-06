<%@ WebHandler Language="VB" Class="NBMANUL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMANUL : Implements IHttpHandler
    Dim res, flag, codigo As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario As String
    Dim empresa As String
    Dim tipo As String
    Dim numero As String
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim fecha As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("usuario")
        empresa = context.Request("empresa")
        tipo = context.Request("tipo")
        numero = context.Request("numero")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        Dim fechaActual As New Date
        fecha = Utilities.fechaLocal(Date.Now())
                
        pidm_cuenta = context.Request("pidm_cuenta")
        
        
        
        Try
            
            Select Case flag
        
                Case "1" 'cobro
                    Dim p As New Nomade.NB.NBCheque("BN")
                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "C", usuario, "", "", "", "", "", "", codigo)
         
                Case "3"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBCheque("BN")
                    dt = p.ListarCheque(String.Empty, String.Empty, String.Empty, String.Empty, "P", String.Empty, empresa)

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If row("NESTADO_CHEQ").ToString <> "ANULADO" Then
                                resb.Append("{")
                                resb.Append("""NUMERO_CHEQ"":""" & row("NUMERO_CHEQ").ToString & """,")
                                resb.Append("""NUMERO_CUENTA"":{""NOMBRE"":""" & row("NUMERO_CUENTA").ToString & """,""PIDM"":""" & row("CTA_PIDM").ToString & """,""CODIGO"":""" & row("CTA_CODE").ToString & """},")
                                resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                                resb.Append("""TIPO"":{""NOMBRE"":""" & row("NTIPO").ToString & """,""CODIGO"":""" & row("TIPO").ToString & """},")
                                resb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_REGISTRO"":{""display"":""" & row("FECHA_REGISTRO").ToString & """,""order"":""" & String.Join("", row("FECHA_REGISTRO").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_COBRAR"":{""display"":""" & row("FECHA_COBRAR").ToString & """,""order"":""" & String.Join("", row("FECHA_COBRAR").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""NGIRADOA"":""" & row("NGIRADOA").ToString & """,")
                                resb.Append("""NFIRMANTE"":""" & row("NFIRMANTE").ToString & """,")
                                resb.Append("""NESTADO_CHEQ"":""" & row("NESTADO_CHEQ").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                                  
                    
            End Select

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