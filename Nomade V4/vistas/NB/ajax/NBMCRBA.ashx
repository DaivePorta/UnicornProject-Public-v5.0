<%@ WebHandler Language="VB" Class="NBMCRBA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMCRBA : Implements IHttpHandler
    
    Dim res, flag As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim empresa As String
    Dim empresapidm As String
    Dim b As New Nomade.NB.NBCreditoBancario("bn")
    Dim ch As New Nomade.NB.NBChequera("bn")
    Dim cuenta As String
    Dim detalle As String
    Dim monto As String
    Dim stbl As String
    Dim tipo As String
    Dim destino As String
    Dim banco As String
    Dim cuota As String
    Dim moneda As String
    Dim tea, codigo, fecha As String
    Dim nroCredito As String
    Dim doc As String
    Dim pagado_ind As String = String.Empty
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        
        context.Response.ContentType = "text/plain"
        empresa = IIf(IsNothing(context.Request("empresa")), String.Empty, context.Request("empresa"))
        empresapidm = IIf(IsNothing(context.Request("empresapidm")), String.Empty, context.Request("empresapidm"))
        flag = context.Request("flag")
        banco = context.Request("banco")
        stbl = IIf(IsNothing(context.Request("stbl")), String.Empty, context.Request("stbl"))
        cuenta = IIf(IsNothing(context.Request("cuenta")), String.Empty, context.Request("cuenta"))
        cuota = IIf(IsNothing(context.Request("cuota")), String.Empty, context.Request("cuota"))
        tipo = IIf(IsNothing(context.Request("tipo")), String.Empty, context.Request("tipo"))
        tea = context.Request("tea")
        moneda = context.Request("moneda")
        tea = context.Request("tea")
        codigo = IIf(IsNothing(context.Request("code")), String.Empty, context.Request("code"))
        monto = context.Request("monto")
        detalle = context.Request("detalle")
        fecha = context.Request("fecha")
        nroCredito = context.Request("nroCredito")
        tipo = context.Request("tipo")
        doc = context.Request("doc")
        destino = context.Request("destino")
        pagado_ind = context.Request("pagado_ind")
        
        Try
        
            Select Case flag
        
                Case "1"
                    res = b.CrearCredito(empresa, stbl, banco, cuenta, empresapidm, cuota, tipo, tea, moneda, HttpContext.Current.User.Identity.Name, monto, detalle, Utilities.fechaLocal(fecha), nroCredito)
                   
                Case "2"
                    res = b.ActualizarCredito(codigo, empresa, stbl, banco, cuenta, empresapidm, cuota, tipo, tea, moneda, HttpContext.Current.User.Identity.Name, monto, detalle, Utilities.fechaLocal(fecha), nroCredito)
     
                Case "3"
                    res = b.CompletarCreditoBancario(codigo, HttpContext.Current.User.Identity.Name, tipo, destino, doc)
                
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "corto", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "CORTO", "ASC"), "codigo", "corto", "EMPRESA")
                    End If
                                        
                Case "5"
                
            
                Case "6"
                    dt = ch.ListarCtasBancarias(empresapidm, "A", "", "", banco)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If
                
                    
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = b.ListarCreditoBancario(codigo, empresa, stbl, cuenta, empresapidm)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                                     
                Case "LD"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = b.ListarDetalleCreditoBancario(codigo, cuota, IIf(IsNothing(pagado_ind), String.Empty, pagado_ind))
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
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
                    res += "<option ruc=""" & dt.Rows(i)("RUC").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option"
                        res += " moneda=""" & dt.Rows(i)("MONEDA_CODE").ToString()
                        res += """ value=""" & dt.Rows(i)(cvalue).ToString()
                        res += """ banco=""" & dt.Rows(i)("BANCO_CODE")
                        res += """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
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