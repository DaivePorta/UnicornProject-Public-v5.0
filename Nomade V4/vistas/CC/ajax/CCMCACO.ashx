<%@ WebHandler Language="VB" Class="CCMCACO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCMCACO : Implements IHttpHandler
    
    Dim dt, dt2 As DataTable
    Dim ccCuentasPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim resb As New StringBuilder
    
    Dim empresa As String
    Dim clientepidm As String
    Dim code_ubig, flag As String
    Dim res, usuario, codigo As String
    Dim pidm_cliente, moneda, html, monto, PIDM_USUARIO As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        empresa = context.Request("empresa")
        clientepidm = context.Request("clientepidm")
        code_ubig = context.Request("code_ubigeo")
        flag = context.Request("flag")
        usuario = context.Request("usuario")
        codigo = context.Request("codigo")
        html = context.Request("html")
        pidm_cliente = context.Request("pidm_cliente")
        moneda = context.Request("moneda")
        monto = context.Request("monto")
        PIDM_USUARIO = context.Request("PIDM_USUARIO")
        Try
        
            Select Case flag.ToString()
                
                Case "1"
                    dt = ccCuentasPorCobrar.ListarDeudasDeClientesVencidos(empresa, "N", "", clientepidm)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            '       If Convert.ToDecimal(row("POR_PAGAR_BASE").ToString) > 0 Then
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString.Substring(0, 10) & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_VENCIMIENTO"":{""display"":""" & row("FECHA_VENCIMIENTO").ToString.Substring(0, 10) & """,""order"":""" & String.Join("", row("FECHA_VENCIMIENTO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""MONTO_MONE_BASE"":""" & row("MONTO_MONE_BASE").ToString & """,")
                            resb.Append("""DIAS"":""" & row("DIAS").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONTO_MONE_ALTER"":""" & row("MONTO_MONE_ALTER").ToString & """,")
                            resb.Append("""ES_MONEDA_BASE"":""" & row("ES_MONEDA_BASE").ToString & """,")
                            resb.Append("""POR_PAGAR_BASE"":""" & row("POR_PAGAR_BASE").ToString & """,")
                            resb.Append("""POR_PAGAR_ALTER"":""" & row("POR_PAGAR_ALTER").ToString & """,")
                            resb.Append("""VALOR_TIPO_CAMBIO"":""" & row("VALOR_TIPO_CAMBIO").ToString & """,")
                            resb.Append("""SUCURSAL_CODE"":""" & row("SUCURSAL_CODE").ToString & """")
                            resb.Append("},")
                            '  End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
            
                    End If
                   
                Case "2"
                    Dim p As New Nomade.NC.NCUbigeo("Bn")
                    dt = p.Listar_Ubigeo(String.Empty, code_ubig, String.Empty, 3, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        For i As Integer = 0 To dt.Rows.Count - 1
                            res = dt.Rows(i)("DESCRIPCION").ToString()
                        Next
                    End If
                Case "3"
                    Dim b As New Nomade.NC.NCCuentaBancaria("BN")
                    Dim dt As New DataTable
                    Dim resb As New StringBuilder()

                    dt = b.ListarCuentasBancarias(empresa, "", "A")
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("CUENTA_COBRANZA").ToString = "S" Then
                                resb.Append("{")
                                resb.Append("""CODE"" :" & """" & row("CODE").ToString & """,")
                                resb.Append("""TIPO"" :" & """" & row("TPOCUENTA").ToString & """,")
                                resb.Append("""BANCO"" :" & """" & row("BANCO").ToString & """,")
                                resb.Append("""NRO_CUENTA"" :" & """" & row("NRO_CUENTA").ToString & """,")
                                resb.Append("""NRO_CTA_INTER"" :" & """" & row("NRO_CTA_INTER").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    b = Nothing
                    res = resb.ToString()
                Case "4"
                    Dim p As New Nomade.NC.NCEEmpleado("Bn")
                    Dim dt As New DataTable
                    Dim sb As New StringBuilder()

                    dt = p.Listar_Empleados(PIDM_USUARIO, 0, "", "", "", "", "")

                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows

                            sb.Append("{")

                            sb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE_EMPLEADO").ToString & """,")

                            sb.Append("""DNI"":""" & row("DNI").ToString & """,")

                            sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("CTLG_DESC").ToString & """,""CODIGO"":""" & row("CTLG_CODE").ToString & """},")

                            sb.Append("""SUCURSAL"":{""NOMBRE"":""" & row("SCSL_DESC").ToString & """,""CODIGO"":""" & row("SCSL_CODE").ToString & """},")

                            sb.Append("""CARGO"":""" & row("CARGO").ToString & """,")

                            'sb.Append("""FECHA_INGRESO"":{""display"":""" & row("FECHA_INGRESO").ToString & """,""order"":""" & String.Join("", row("FECHA_INGRESO").ToString.Split("/").Reverse()) & """},")

                            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")

                            sb.Append("""REG_SALUD_DESC"":""" & row("REG_SALUD_DESC").ToString & """")

                            sb.Append("},")

                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")

                        sb.Append("]")
                    End If
                    p = Nothing
                    res = sb.ToString()
                    
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.CC.CCCartaCobranza("Bn")
                    Dim dt As New DataTable
                    Dim sb As New StringBuilder()
                    dt = p.ListarCartaCobranza(empresa, codigo)
                  
                    If Not dt Is Nothing Then
                        sb.Append("[")
                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            sb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                            sb.Append("""CLIENTE"":""" & row("CLIENTE").ToString & """,")
                            sb.Append("""PIDM_CLIENTE"":""" & row("PIDM_CLIENTE").ToString & """,")
                            sb.Append("""MON_CODE"":""" & row("MONE_CODE").ToString & """,")
                            sb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                            sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            'sb.Append("""HTML"":""" & row("HTML").ToString & """,")
                            sb.Append("""FECHA"":{""display"":""" & row("FECHA_ACTV").ToString & """,""order"":""" & String.Join("", row("FECHA_ACTV").ToString.Substring(0, 10).Split("/").Reverse()) & """}")
                            sb.Append("},")
                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")
                        sb.Append("]")
                    End If
                    p = Nothing
                    res = sb.ToString()
                Case "5.1"
                    Dim p As New Nomade.CC.CCCartaCobranza("Bn")
                    Dim dt As New DataTable

                    dt = p.ListarCartaCobranza(empresa, codigo)
                  
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            res = row("HTML").ToString
                        Next
                    End If
                    p = Nothing
                Case "5.2"
                    Dim p As New Nomade.CC.CCCartaCobranza("Bn")
                    Dim dt As New DataTable

                    dt = p.ListarCartaCobranza(empresa, codigo)
                  
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            res = row("PIDM_CLIENTE").ToString
                        Next
                    End If
                    p = Nothing
                Case "6"
                    Dim p As New Nomade.CC.CCCartaCobranza("Bn")
                    res = p.CrearCartaCobranza(empresa, pidm_cliente, moneda, monto, html, usuario)
                Case "LMAILS"
                    context.Request.ContentType = "application/json; charset=utf-8"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    dt = mail.ListarCorreosAsociados(pidm_cliente, 0, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("Correo").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""email"" :" & """" & row("Correo").ToString().ToLower & """,")
                                resb.Append("""name"" :" & """" & row("Nombres").ToString & """,")
                                resb.Append("""usuario"" :" & """" & row("USUARIO").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                    End If
                    res = resb.ToString()
            End Select

            context.Response.Write(res)
       
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
 
    
     
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class