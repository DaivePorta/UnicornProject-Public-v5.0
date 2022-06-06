<%@ WebHandler Language="VB" Class="NAMSECC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMSECC : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
        
    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim res As String
    Dim resb As New StringBuilder
 
    Dim codempr As String
    Dim usua As String
    Dim Costo As String
        
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        
        
        opcion = context.Request("flag")
        code = context.Request("code")
        
        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        ALMACEN = context.Request("ALMACEN")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN = context.Request("TIPO_ALMACEN")
        
        TIPO_ALMACENAJE = context.Request("TIPO_ALMACENAJE")
     
             
        ESTADO = context.Request("ESTADO")

        USUARIO = context.Request("USUARIO")
       
        SISTEMA_ALMACENAJE = context.Request("SISTEMA_ALMACENAJE")
        
        PALETIZADO_IND = context.Request("PALETIZADO_IND")
        
        NRO_PALETS = context.Request("NRO_PALETS")
        
        Costo = context.Request("Costo")
        
        If (NRO_PALETS = String.Empty) Then
            NRO_PALETS = "0"
        End If
        
        codempr = context.Request("codempr")
        usua = context.Request("usua")
        
        Try
            Select Case opcion
                
                Case "1"
                    res = p.CrearSeccionAlmacen(EMPRESA, ALMACEN, DESCRIPCION, TIPO_ALMACEN, TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS, Costo)
                    
                Case "2"
                    res = p.ActualizarSeccionAlmacen(CODIGO, EMPRESA, ALMACEN, DESCRIPCION, TIPO_ALMACEN, TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS, Costo)
                    
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarSeccionAlmacen(code, String.Empty, String.Empty, String.Empty)
                    
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""EMPRESA"":" & """" & MiDataRow("CODIGO_EMPRESA").ToString & """,")
                            resb.Append("""ALMACEN"":" & """" & MiDataRow("CODIGO_ALMACEN").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO_ALMACEN"":" & """" & MiDataRow("TIPO_ALMACEN").ToString & """,")
                            resb.Append("""TIPO_ALMACENAJE"":" & """" & MiDataRow("TIPO_ALMACENAJE").ToString & """,")
                            resb.Append("""PALETIZADO"":" & """" & MiDataRow("PALETIZADO").ToString & """,")
                            resb.Append("""NRO_PALETS"":" & """" & MiDataRow("NRO_PALETS").ToString & """,")
                            resb.Append("""SISTEMA_ALMACENAJE"":" & """" & MiDataRow("SISTEMA_ALMACENAJE").ToString & """,")
                            resb.Append("""COSTO"":" & """" & MiDataRow("COSTO_SECCION").ToString & """,")
                            resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """")
                           
                            resb.Append("}")
                        Next
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
               
                Case "8"
                    Dim p As New Nomade.NA.NATipoAlmacen("BN")
                    dt = p.ListarTipoAlmacen(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "nombre", "TIPO_ALMACEN")
               
                Case "9"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    
                Case "10"
                    Dim p As New Nomade.NA.NAConfAlmacenes("BN")
                    dt = p.ListarAlmacenes(String.Empty, codempr, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "ALMACEN")
                    
                
                                 
               
                 
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
                If i = 0 Then
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """ selected=""selected"">" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
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

End Class