<%@ WebHandler Language="VB" Class="NCNUDC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCNUDC : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCNumeracionDC("Bn")
    Dim res As String
    Dim codigo, tipocomprobante, tipoimpr, caja, activo, user, codrec, impr, corre, ndigito, nrolineas, serie, valini, valfin, tipodoc, autori, imprenta As String
    
    Dim resb As New StringBuilder
    
    Dim codtipoimpr, codscsl, codempr, codcaja As String
    Dim scsl As String
    Dim tipocampo As String
    Dim usua As String
    Dim codalmacen As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'recoger variables para combo
        codtipoimpr = context.Request("tipoimpr")
        codempr = context.Request("codempr")
        codscsl = context.Request("codscsl")
        codcaja = context.Request("codcaja")
        codalmacen = context.Request("codalmacen")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        tipocomprobante = context.Request("tico")
        tipocampo = context.Request("tica")
        scsl = context.Request("scsl")
        caja = context.Request("caja")
        impr = context.Request("impr")
        user = context.Request("user")
        corre = context.Request("corr")
        ndigito = context.Request("ndig")
        nrolineas = context.Request("lineas")
        serie = context.Request("seri")
        activo = context.Request("acti")
        valini = context.Request("vain")
        valfin = context.Request("vafi")
        tipodoc = context.Request("tido")
        autori = context.Request("auto")
        imprenta = context.Request("imta")
        usua = context.Request("usua")
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    res = CrearNuDC(tipocomprobante, tipocampo, scsl, caja, impr, corre, ndigito, nrolineas, serie, activo, valini, valfin, tipodoc, autori, imprenta, user, codempr)
                    
                Case "2"
                    res = ActualizarNuDC(codigo, tipocomprobante, tipocampo, scsl, caja, impr, corre, ndigito, nrolineas, serie, activo, valini, valfin, tipodoc, autori, imprenta, user, codempr)
                    
                Case "3"
                    res = CambiarEstadoNuDC(codigo)
                    
                Case "4"
                    Dim p2 As New Nomade.NC.NCTipoDC("BN")
                    dt = p2.ListarTipoDC(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "DOCUMENTO COMERCIAL")
                    
                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If
                    
                Case "6"
                    Dim p2 As New Nomade.NC.NCSucursal("BN")
                    dt = p2.ListarSucursal(codempr, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "SUCURSAL")
                    
                
                Case "7"
                    Dim p2 As New Nomade.NC.NCCaja("BN")
                    dt = p2.ListarCaja(String.Empty, String.Empty, codscsl, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "CAJA")
                    
                Case "8"
                    Dim p2 As New Nomade.NC.NCImpresora("BN")
                    dt = p2.ListarImpresoraCaja("A", tipocomprobante, codcaja)
                    res = GenerarSelect(dt, "codigo", "impresora", "IMPRESORA")
                    
                Case "9"
                    Dim p2 As New Nomade.NA.NAConfAlmacenes("BN")
                    dt = p2.ListarAlmacenes(String.Empty, String.Empty, codscsl, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "ALMACEN")
                    
                Case "10"
                    Dim p2 As New Nomade.NC.NCImpresora("BN")
                    dt = p2.ListarImpresoraAlmacen("A", tipocomprobante, codalmacen)
                    res = GenerarSelect(dt, "codigo", "impresora", "IMPRESORA")
                    
                Case "LTDC" 'Listar Tipo de Documentos Comerciales por Empresa
                    Dim dcct As New Nomade.NC.NCTipoDCEmpresa("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dcct.ListarTipoDCEmpresa(String.Empty, codempr, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                            resb.Append("""DCTO_CODE"":""" & row("DCTO_CODE").ToString & """,")
                            resb.Append("""SUNAT_CODE"":""" & row("SUNAT_CODE").ToString & """,")
                            resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""DCTO_DESC"":""" & row("DCTO_DESC").ToString & """")
                            resb.Append("},")
                        Next
                    End If
                    If Not dt Is Nothing Then
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case Else
                    Dim p2 As New Nomade.NC.NCSucursal("Bn")
                    ' Dim dt2 As DataTable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarNuDC(codrec, String.Empty, String.Empty)
                    '  dt2 = p2.ListarSucursal(String.Empty, dt.Rows(0)("SUCURSAL"), String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODCOMPROBANTE"" :" & """" & dt.Rows(0)("CODCOMPROBANTE") & """,")
                    resb.Append("""TIPO_CAMPO"" :" & """" & dt.Rows(0)("TIPO_CAMPO") & """,")
                    resb.Append("""SUCURSAL"" :" & """" & dt.Rows(0)("SUCURSAL") & """,")
                    resb.Append("""CODCAJA"" :" & """" & dt.Rows(0)("CODCAJA") & """,")
                    resb.Append("""CODIMPRESORA"" :" & """" & dt.Rows(0)("CODIMPRESORA") & """,")
                    resb.Append("""CORRE"" :" & """" & dt.Rows(0)("CORRE") & """,")
                    resb.Append("""NRO_DIGITO"" :" & """" & dt.Rows(0)("NRO_DIGITO") & """,")
                    resb.Append("""NRO_LINEAS"" :" & """" & dt.Rows(0)("NRO_LINEAS") & """,")
                    resb.Append("""SERIE"" :" & """" & dt.Rows(0)("SERIE") & """,")
                    resb.Append("""VALOR_INICIO"" :" & """" & dt.Rows(0)("VALOR_INICIO") & """,")
                    resb.Append("""VALOR_FIN"" :" & """" & dt.Rows(0)("VALOR_FIN") & """,")
                    resb.Append("""TIPO_DOC"" :" & """" & dt.Rows(0)("TIPO_DOC") & """,")
                    resb.Append("""COD_AUTORI"" :" & """" & dt.Rows(0)("COD_AUTORI") & """,")
                    resb.Append("""IMPRENTA"" :" & """" & dt.Rows(0)("IMPRENTA").Replace("""", "\""") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("CODE_EMPRESA") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                 
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
        
    End Sub
 
    Public Function CrearNuDC(ByVal p_tipocomprobante As String, ByVal p_tipocampo As String, ByVal p_scsl As String, ByVal p_caja As String, ByVal p_impr As String, ByVal p_corre As String, ByVal p_ndigito As String, ByVal p_nrolineas As String, ByVal p_serie As String, ByVal p_activo As String, ByVal p_valini As String, ByVal p_valfin As String, ByVal p_tipodoc As String, ByVal p_autori As String, ByVal p_imprenta As String, ByVal p_user As String, ByVal p_empr As String) As String
        Dim datos As String
        
        datos = p.CrearNuDC(p_tipocomprobante, p_tipocampo, p_scsl, p_caja, p_impr, p_corre, p_ndigito, p_nrolineas, p_serie, p_activo, p_valini, p_valfin, p_tipodoc, p_autori, p_imprenta, p_user, p_empr)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoNuDC(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoNuDC(p_codigo)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarNuDC(ByVal p_codigo As String, ByVal p_tipocomprobante As String, ByVal p_tipocampo As String, ByVal p_scsl As String, ByVal p_caja As String, ByVal p_impr As String, ByVal p_corre As String, ByVal p_ndigito As String, ByVal p_nrolineas As String, ByVal p_serie As String, ByVal p_activo As String, ByVal p_valini As String, ByVal p_valfin As String, ByVal p_tipodoc As String, ByVal p_autori As String, ByVal p_imprenta As String, ByVal p_user As String, ByVal p_empr As String) As String
        Dim datos As String
        
        datos = p.ActualizarNuDC(p_codigo, p_tipocomprobante, p_tipocampo, p_scsl, p_caja, p_impr, p_corre, p_ndigito, p_nrolineas, p_serie, p_activo, p_valini, p_valfin, p_tipodoc, p_autori, p_imprenta, p_user, p_empr)
        
        
        Return datos
        
    End Function
        
        
    
    
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
         
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
          
        Else
            res = "error"
        End If
        Return res
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    
    
    
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class