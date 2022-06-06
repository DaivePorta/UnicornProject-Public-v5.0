<%@ WebHandler Language="VB" Class="NBMFIRM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMFIRM : Implements IHttpHandler
    Dim res, flag, codigo As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario As String
    Dim ctlg As String
    Dim pidm_cuenta As String
    Dim codigo_cuenta As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("usuario")
        ctlg = context.Request("ctlg_code")
        
        pidm_cuenta = context.Request("pidm_cue")
        codigo_cuenta = context.Request("cuenta_code")
        
        Try
            
            Select Case flag
        
                Case "1" 'APROBAR
                    Dim p As New Nomade.NB.NBCheque("BN")
                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "E", usuario, "", "", "", "", "", "", codigo)
                
                Case "2" 'RECHAZAR
                    Dim p As New Nomade.NB.NBCheque("BN")
                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "R", usuario, "", "", "", "", "", "", codigo)
                Case "3"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New NOMADE.NB.NBCheque("BN")
                    dt = p.ListarCheque(String.Empty, codigo_cuenta, pidm_cuenta, String.Empty, "F")

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
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

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                    
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim r As New Nomade.NC.NCEmpresa("Bn")
                    dt = r.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim c As New Nomade.NC.NCCuentaBancaria("Bn")
                    dt = c.ListarCuentasBancarias(ctlg, "", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("TPOCUENTA_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONE_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "6"
                    
                    

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