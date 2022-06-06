 <%@ WebHandler Language="VB" Class="CPMPGDT" %>

Imports System
Imports System.Web
Imports System.Data


Public Class CPMPGDT : Implements IHttpHandler
    Dim dt, dt2 As DataTable
    Dim s As New NOMADE.NC.NCEAdicionales("bn")
    Dim DetraccionProveedor As New NOMADE.CP.CPDetraccionProveedor("Bn")
    Dim LotePagoDetraccion As New NOMADE.CP.CPLoteDetracciones("Bn")
    Dim ccPercepcion As New NOMADE.CC.CCPercepcion("Bn")
    Dim flag As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim empresapidm As String
    Dim codigo As String
    Dim empresa As String
    Dim proveedor As String
    Dim prov As New NOMADE.NC.NCEProveedor("Bn")
    Dim estable As String
    Dim detalle As String
    Dim caja As String
    Dim usuario As String
    Dim codigo_apertura As String
    Dim moneda As String
    Dim medio_pago As String
    Dim descripcion As String
    Dim destino As String
    Dim fecha_pago As String
    Dim banco As String
    Dim cuenta As String
    Dim pidmcuenta As String
    Dim tipo As String
    Dim factura As String
    Dim documento As String
    Dim completo As String
    Dim adicional As String
    Dim monto_total As String
    Dim origen As String
    Dim nro_seq As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        proveedor = context.Request("proveedor")
        detalle = context.Request("detalle")
        caja = context.Request("caja")
        usuario = context.Request("usuario")
        codigo_apertura = context.Request("codigo_apertura")
        moneda = context.Request("moneda")
        medio_pago = context.Request("medio_pago")
        descripcion = context.Request("descripcion")
        destino = context.Request("destino")
        fecha_pago = Utilities.fechaLocal(context.Request("fecha_pago"))
        banco = context.Request("banco")
        cuenta = context.Request("cuenta")
        pidmcuenta = context.Request("pidmcuenta")
        tipo = context.Request("tipo")
        factura = context.Request("factura")
        documento = context.Request("documento")
        completo = context.Request("completo")
        adicional = context.Request("adicional")
        monto_total = context.Request("monto_total")
        origen = context.Request("origen")
        nro_seq = context.Request("nro_seq")
        Try
        
            Select Case flag.ToString()

                Case "1" 'crear pago x banco
                    res = DetraccionProveedor.PagarDetraccionProveedorBanco(detalle, pidmcuenta, cuenta, usuario, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, completo, monto_total, adicional)
              
                Case "1B" 'crear pago x caja
                    res = DetraccionProveedor.PagarDetraccionProveedorCaja(detalle, origen, usuario, codigo_apertura, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, monto_total)
              
                    
                Case "1.1" ' crea lote pago detraccion
                    res = LotePagoDetraccion.CrearLotePagoDetraccion(nro_seq, fecha_pago, monto_total, empresa, detalle, medio_pago, usuario, origen, destino, descripcion, moneda, codigo_apertura, cuenta, pidmcuenta, adicional, tipo)(0)
                  
                Case "1.2" 'completa pago lote detracciones
                    res = LotePagoDetraccion.CompletarPagoLoteDetraccion(medio_pago, codigo, fecha_pago, usuario, origen, destino, documento, descripcion, codigo_apertura, cuenta, pidmcuenta, adicional, tipo)
                    
                Case "1.3" ' lista lotes de detracciones detracciones
                    dt = LotePagoDetraccion.ListarPagoLoteDetraccion(String.Empty, empresa, completo)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""NRO_SECUENCIAL"":""" & row("NRO_SECUENCIAL").ToString & """,")
                            resb.Append("""EMPRESA"":{""CODIGO"":""" & row("EMPRESA").ToString & """,""NOMBRE"":""" & row("NEMPRESA").ToString & """},")
                            resb.Append("""FECHA_CREACION"":{""display"":""" & row("FECHA_CREACION").ToString & """,""order"":""" & String.Join("", row("FECHA_CREACION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_COMPLETO"":{""display"":""" & row("FECHA_COMPLETO").ToString & """,""order"":""" & String.Join("", row("FECHA_COMPLETO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                            resb.Append("""COMPLETADO_IND"":""" & row("COMPLETADO_IND").ToString & """,")
                            resb.Append("""DETALLE"":")
                            resb.Append("[")
                            
                            For Each rowDet As String In row("DETALLE").ToString().Split("|")
                                dt2 = DetraccionProveedor.ListarDetraccionProveedor(rowDet.ToString().Split(",")(0), String.Empty, String.Empty, empresa, "")
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & dt2.Rows(0)("CODIGO_DETRACCION").ToString & """,")
                                resb.Append("""TIPO_DOC"":""" & dt2.Rows(0)("TIPO_DOC").ToString & """,")
                                resb.Append("""DOCUMENTO"":{""CODIGO"":""" & dt2.Rows(0)("CODIGO_DOC").ToString & """,""NUMERO"":""" & dt2.Rows(0)("NUMERO_DOC").ToString & """},")
                                resb.Append("""MONTO"":""" & dt2.Rows(0)("MONTO").ToString & """,")
                                resb.Append("""DETRACCION_CODE_SUNAT"":""" & dt2.Rows(0)("DETRACCION_CODE_SUNAT").ToString & """,")
                                resb.Append("""MONEDA"":{""CODIGO"":""" & dt2.Rows(0)("MONE_CODE") & """,""SIMBOLO"":""" & dt2.Rows(0)("MONEDA").ToString & """},")
                                resb.Append("""NRO_CTA_DETRACCION"":""" & dt2.Rows(0)("NRO_CTA_DETRACCION").ToString & """,")
                                resb.Append("""FECHA_EMISION_DCTO"":{""display"":""" & dt2.Rows(0)("FECHA_EMISION_DCTO").ToString & """,""order"":""" & String.Join("", dt2.Rows(0)("FECHA_EMISION_DCTO").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""PROVEEDOR"":{""CODIGO"":""" & dt2.Rows(0)("PROVEEDOR").ToString & """,""DOCUMENTO"":""" & dt2.Rows(0)("PROVEEDOR_NDOC").ToString & """,""NOMBRE"":""" & dt2.Rows(0)("NPROVEEDOR").ToString & """}")
                                resb.Append("},")
                            Next
                            
                            resb.Append("-")
                            resb.Replace("},-", "}")
                            resb.Append("],")
                            
                            
                            resb.Append("""MEDIO_PAGO"":{""CODIGO"":""" & row("MEDIO_PAGO").ToString & """,""NOMBRE"":""" & row("NMEDIO_PAGO").ToString & """},")
                            resb.Append("""USUARIO_COMPLETO"":""" & row("USUARIO_COMPLETO").ToString & """,")
                            resb.Append("""ORIGEN"":""" & row("ORIGEN").ToString & """,")
                            resb.Append("""DESTINO"":""" & row("DESTINO").ToString & """,")
                            resb.Append("""OPERACION"":""" & row("OPERACION").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""MONEDA"":{""CODIGO"":""" & row("MONEDA_CODE") & """,""SIMBOLO"":""" & row("SMONEDA").ToString & """},")
                            resb.Append("""APERTURA_CODE"":""" & row("APERTURA_CODE").ToString & """,")
                            resb.Append("""ADICIONAL"":""" & row("ADICIONAL").ToString & """,")
                            resb.Append("""CUENTA"":{""CODIGO"":""" & row("CUENTA_CODE").ToString & """,""PIDM"":""" & row("PIDM_CUENTA") & """}")
                           
                            resb.Append("},")
                          
                        Next
                   
                    
                        resb.Append("-")
                        resb.Replace("},-", "}")
                   
                        
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                   
                Case "1.4"
                    res = LotePagoDetraccion.LitsarSgteNroLoteDetraccion(empresa)
                    
                    
                Case "2" 'lista forma de pago
       
                    dt = ccPercepcion.ListarFormasPago("", "", "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion_corta", "FOPA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "descripcion_corta", "ASC"), "codigo", "descripcion_corta", "FOPA")
                    End If
             
                   
             
                Case "3"
                    dt = prov.ListarProveedor("0", "A", empresa)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "pidm", "razon_social", "PROVEEDOR")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "razon_social", "ASC"), "pidm", "razon_social", "PROVEEDOR")
                    End If
                
                    
                    
                Case "4"
                 
                    Dim dt As DataTable
                    Dim resb As New StringBuilder

                    dt = DetraccionProveedor.ListarDetraccionProveedor(String.Empty, String.Empty, tipo, empresa, "")
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO_DETRACCION").ToString & """,")
                            resb.Append("""LOTE"":""" & row("LOTE").ToString & """,")
                            resb.Append("""ITEM_DETALLE"":""" & row("ITEM_DETALLE").ToString & """,")
                            resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""DOCUMENTO"":{""CODIGO"":""" & row("CODIGO_DOC").ToString & """,""NUMERO"":""" & row("NUMERO_DOC").ToString & """},")
                            resb.Append("""FECHA_EMISION_DCTO"":{""display"":""" & row("FECHA_EMISION_DCTO").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION_DCTO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_PAGO"":{""display"":""" & row("FECHA_PAGO").ToString & """,""order"":""" & String.Join("", row("FECHA_PAGO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""ES_MONEDA_BASE"":""" & row("ES_MONEDA_BASE").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""DETRACCION_DEFINICION"":""" & row("DETRACCION_DEFINICION").ToString & """,")
                            resb.Append("""DETRACCION_CODE_SUNAT"":""" & row("DETRACCION_CODE_SUNAT").ToString & """,")
                            resb.Append("""NRO_CTA_DETRACCION"":""" & row("NRO_CTA_DETRACCION").ToString & """,")
                            resb.Append("""PAGADO"":""" & row("PAGADO").ToString & """,")
                            resb.Append("""MONEDA"":{""CODIGO"":""" & row("MONE_CODE") & """,""SIMBOLO"":""" & row("MONEDA").ToString & """},")
                            resb.Append("""CTA_DETRACCION"":""" & row("CTA_DETRACCION").ToString & """,")
                            resb.Append("""PROVEEDOR"":{""CODIGO"":""" & row("PROVEEDOR").ToString & """,""DOCUMENTO"":""" & row("PROVEEDOR_NDOC") & """,""NOMBRE"":""" & row("NPROVEEDOR").ToString & """}")
                           
                            resb.Append("},")
                          
                        Next
                   
                    
                        resb.Append("-")
                        resb.Replace("},-", "}")
                   
                        
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If
                   
         
                    
                Case "5"
                    Dim p As New NOMADE.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If
                
                
                Case "6"
                  
                    dt = s.Listar_DatosBancarios(empresapidm, "", banco, moneda, String.Empty, "A") '0005 cuenta detracciones
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If
                    
                Case "6.5"
                  
                    dt = s.Listar_DatosBancarios(empresapidm, "", "", moneda, "", "A")

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DES", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    End If
                    
                Case "7"
                    Dim p As New NOMADE.NC.NCCaja("BN")
                    dt = p.ListarCajasAperturadas(String.Empty, empresa, String.Empty, String.Empty, "A", usuario)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODIGO", "DESCRIPCION", "CAJA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "CODIGO", "DESCRIPCION", "CAJA")
                    End If
                    
                    'VALIDA CAJA ACTIVA
                Case "7.5"
                    Dim p As New NOMADE.NC.NCCaja("BN")
                    res = p.ListarCajasAperturadas(codigo, empresa, String.Empty, String.Empty, "A").Rows(0)("MONTOCAJA").ToString()
              
                    
                    
                Case "8"
                    Dim p As New NOMADE.NB.NBCheque("Bn")
                    dt = p.ListarCheque("", cuenta, pidmcuenta, "", "E", "P")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO_CHEQ", "ASC"), "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    End If
                    
                Case "9"
                    Dim p As New NOMADE.NC.NCTarjetasEmpresa("Bn")
                    dt = p.ListarTarjetaEmpresa("", pidmcuenta, cuenta, "A", tipo)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODE", "NUMERO", "NTARJETA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO", "ASC"), "CODE", "NUMERO", "NTARJETA")
                    End If
                    
                Case "M"
                    Dim p As New NOMADE.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString
                    
                Case "MO"
                    Dim p As New NOMADE.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")
                    
            End Select

            context.Response.Write(res)
       
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
        
    End Sub
 
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
         
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option RUC=""" & dt.Rows(i)("RUC").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option monto=""" & dt.Rows(i)("SALDO") & """ banco=""" & dt.Rows(i)("BANC_CODE") & """ moneda=""" & dt.Rows(i)("MONE_CODE").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        If clase = "MONEDA" Then
                            res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                        Else
                            If clase = "CAJA" Then
                                res += "<option monto=""" & dt.Rows(i)("MONTOCAJA").ToString() & """ monto_d=""" & dt.Rows(i)("MONTOCAJA_DOLARES").ToString() & """ codigo=""" & dt.Rows(i)("CODIGO_APERTURA").ToString() & """ stbl=""" & dt.Rows(i)("SUCURSAL").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                            Else
                                If clase = "CHEQUE" Then
                                    res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ ngiradoa=""" & dt.Rows(i)("NGIRADOA").ToString() & """ giradoa=""" & dt.Rows(i)("GIRADOA").ToString() & """ monto=""" & dt.Rows(i)("MONTO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " (" & dt.Rows(i)("SMONEDA").ToString() & " " & dt.Rows(i)("MONTO").ToString() & ")" & "</option>"
                                Else
                                    If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                    End If
                                End If
                            End If
                        End If
                    End If
                End If
            Next
          
        Else
            res = "error"
        End If
        Return res
    End Function
    
     
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