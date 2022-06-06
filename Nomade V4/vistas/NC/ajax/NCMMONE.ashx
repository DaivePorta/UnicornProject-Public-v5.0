<%@ WebHandler Language="VB" Class="NCMMONE" %>

Imports System.Data
Imports System
Imports System.Web

Public Class NCMMONE : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    
    Dim opcion As String
    Dim codigo As String
    Dim code As String
    Dim sTipoMoneda As String = ""
    
    Dim codigoSunat, descripcion, desCorto, simbolo, activo, paises, empresa, usuario As String
    
    Dim dt As DataTable
    Dim dt1 As DataTable
    Dim dt2 As DataTable
    
    Dim Pais As New Nomade.NC.NCPais("Bn")
    Dim Emp As New Nomade.NC.NCEmpresa("Bn")
    Dim Mone As New Nomade.NC.NCMonedas("Bn")
    Dim resPais As New StringBuilder
    Dim resEmpr As New StringBuilder
    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/html"
        Try
            
            opcion = context.Request("opcion")
            codigo = context.Request("codigo")
            code = context.Request.QueryString("CODE")
            
            codigoSunat = context.Request("cod_sunat")
            descripcion = context.Request("descripcion")
            desCorto = context.Request("des_corto")
            simbolo = context.Request("simbolo")
            activo = context.Request("activo")
            paises = context.Request("pais")
            empresa = context.Request("empresa")
            empresa = IIf(empresa Is Nothing, Utilities.mGetEmpresa(context), empresa)
            usuario = context.Request("usuario")
            
            sTipoMoneda = context.Request("sTipoMoneda")
            sTipoMoneda = IIf(sTipoMoneda Is Nothing, "", sTipoMoneda).ToString.Trim
                  
            
            Select Case opcion.ToString()
                
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Mone.ListarMoneda(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""CODE_PAIS"" :" & """" & MiDataRow("Cod_Pais").ToString & """,")
                            resb.Append("""DESC_PAIS"" :" & """" & MiDataRow("Nombre_Pais").ToString & """,")
                            resb.Append("""DESC_MONE"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""CODIGO_EMPRESA"" :" & """" & MiDataRow("Empresa").ToString & """,")
                            resb.Append("""NOMBRE_EMPRESA"" :" & """" & MiDataRow("Nombre_Empresa").ToString & """,")
                            resb.Append("""DESCRIP_CORTO"" :" & """" & MiDataRow("Descripcion_Corto").ToString & """,")
                            resb.Append("""SIMBOLO"" :" & """" & MiDataRow("Simbolo").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("estado_id").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                
                Case "1"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt1 = Pais.Listar_Pais(String.Empty, String.Empty, "A")
                    If Not (dt1 Is Nothing) Then
                        resPais.Append("[")
                        For Each MiDataRow As DataRow In dt1.Rows
                            resPais.Append("{")
                            resPais.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resPais.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                            resPais.Append("}")
                            resPais.Append(",")
                        Next
                        resPais.Append("{}")
                        resPais = resPais.Replace(",{}", String.Empty)
                        resPais.Append("]")
                    End If
                    res = resPais.ToString()
                    
                Case "2"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt2 = Emp.ListarEmpresa(String.Empty, String.Empty, context.User.Identity.Name)
                    If Not (dt2 Is Nothing) Then
                        resEmpr.Append("[")
                        For Each MiDataRow As DataRow In dt2.Rows
                            resEmpr.Append("{")
                            resEmpr.Append("""CODIGO"" : " & """" & MiDataRow("CODIGO").ToString & """,")
                            resEmpr.Append("""DESCRIPCION"": " & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resEmpr.Append("}")
                            resEmpr.Append(",")
                        Next
                        resEmpr.Append("{}")
                        resEmpr = resEmpr.Replace(",{}", String.Empty)
                        resEmpr.Append("]")
               
                    End If
                    res = resEmpr.ToString()
               
                    
                Case "N"
                    
                    res = CrearMoneda(codigoSunat, descripcion, desCorto, empresa, simbolo, paises, activo, usuario)
                    
                Case "M"
                   
                    res = ActualizarMoneda(codigo, codigoSunat, descripcion, desCorto, empresa, simbolo, paises, activo, usuario)
                    
                Case "A"
                    
                    res = CambiarEstadoMoneda(codigo)
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Mone.ListarMoneda(code, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4" 'lista monedas B/A
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Mone.ListarMoneda_AL_BA(empresa) ' ("", sTipoMoneda) ' fnListarMonedaBaseAlterna
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
            End Select
                        
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
               
    End Sub
    
  
 
    Public Function CrearMoneda(ByVal p_CODE_SUNAT As String, ByVal p_DESC_MONE As String, ByVal p_DESC_CORTA As String, ByVal p_EMPRESA As String, _
                                ByVal p_SIMBOLO As String, ByVal p_PAIS As String, ByVal p_ESTADO_MONE As String, ByVal p_USUARIO As String) As String
        
        Dim datos(1) As String
        datos = Mone.CrearMoneda(p_CODE_SUNAT, p_DESC_MONE, p_DESC_CORTA, p_EMPRESA, p_SIMBOLO, p_PAIS, p_ESTADO_MONE, p_USUARIO)
        Mone = Nothing
        Return datos(0)
                       
    End Function
   
    
    Public Function ActualizarMoneda(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC_MONE As String, ByVal p_DESC_CORTA As String, ByVal p_CTLG_CODE As String, ByVal p_SIMBOLO As String, _
                                ByVal p_PAIS As String, ByVal p_ESTADO As String, ByVal p_USUARIO As String) As String
       
        Dim datos(1) As String
        datos = Mone.ActualizarMoneda(p_CODE, p_CODE_SUNAT, p_DESC_MONE, p_DESC_CORTA, p_CTLG_CODE, p_SIMBOLO, p_PAIS, p_ESTADO, p_USUARIO)
        Mone = Nothing
        Return datos(0)
        
    End Function
    
         
    Public Function CambiarEstadoMoneda(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = Mone.CambiarEstadoMoneda(p_CODE)
        
        Return datos(0)
     
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