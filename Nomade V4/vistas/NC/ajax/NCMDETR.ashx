<%@ WebHandler Language="VB" Class="NCMDETR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMDETR : Implements IHttpHandler
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCDetracciones("Bn")
    Dim res As String
    Dim codigo, anexo, definicion, tipo_existencia, fecha_inicio, user, fecha_fin, porcentaje, estado, cod_sunat As String
    Dim resb As New StringBuilder
    Dim indice As String
    Dim info As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
       
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        anexo = context.Request("anexo")
        definicion = context.Request("definicion")
        tipo_existencia = context.Request("tipo_existencia")
        fecha_inicio = context.Request("fecha_inicio")
        indice = context.Request("indice")
        info = context.Request("info")
        cod_sunat = context.Request("cod_sunat")
        If indice = String.Empty Then
            indice = 0
        End If
        If fecha_inicio <> String.Empty Then
            fecha_inicio = Utilities.fechaLocal(context.Request("fecha_inicio"))
        End If
        fecha_fin = context.Request("fecha_fin")
        If fecha_fin <> String.Empty Then
            fecha_fin = Utilities.fechaLocal(context.Request("fecha_fin"))
        End If
        porcentaje = context.Request("porcentaje")
        If porcentaje = String.Empty Then
            porcentaje = 0
        End If
        estado = context.Request("estado")
        user = context.Request("user")
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = p.CrearDetracciones(anexo, definicion, tipo_existencia, estado, user, info, cod_sunat)
                    
                Case "2"
                    
                    res = p.ActualizarDetracciones(codigo, anexo, definicion, tipo_existencia, estado, user, info, cod_sunat)
                    
                    
                Case "3"
                    
                    res = p.CambiarEstadoDetracciones(codigo)
                    
                Case "4"
                    
                    res = p.CrearDetracciones_Detalle(codigo, fecha_inicio, fecha_fin, porcentaje, user, indice)
                    
                Case "5"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarDetracciones_Detalle(codigo, "A")
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""INDICE"" :" & """" & row("INDICE") & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & row("FECHA_INICIO") & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & row("FECHA_FIN") & """,")
                        resb.Append("""PORCENTAJE"" :" & """" & row("PORCENTAJE") & """,")
                        resb.Append("""ESTADO"" :" & """" & row("ESTADO") & """")
                        resb.Append("},")
                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                    
                Case "6"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarDetracciones(codigo, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""ANEXO"" :" & """" & dt.Rows(0)("ANEXO") & """,")
                    resb.Append("""DEFINICION"" :" & """" & dt.Rows(0)("DEFINICION") & """,")
                    resb.Append("""TIPO_EXISTENCIA_CODE"" :" & """" & dt.Rows(0)("TIPO_EXISTENCIA_CODE") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""INFORMACION"" :" & """" & dt.Rows(0)("INFORMACION").ToString().Replace(vbLf, "\n").Replace("""", "\""") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                
                Case "7"
                    context.Response.ContentType = "text/plain"
                    Dim p2 As New Nomade.NM.NMTipodeExistencia("Bn")
                    dt = p2.Listar_Existencias(String.Empty, String.Empty, "A", String.Empty)
                    res=GenerarSelect(dt, "codigo", "descripcion", "EXISTENCIAS")
                    
                    
                    
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

End Class