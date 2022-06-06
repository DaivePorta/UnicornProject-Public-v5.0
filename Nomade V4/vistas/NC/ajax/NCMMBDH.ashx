<%@ WebHandler Language="VB" Class="NCMMBDH" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMMBDH : Implements IHttpHandler

    
    Dim code As String
    Dim opcion As String
    
    Dim codigo, cod_sunat, descripcion, estado, usuario, cod_vinc_fam As String
    
    Dim motivoBaj As New Nomade.NC.NCMotivosBajaDerecho("Bn")
    Dim dt As New DataTable
    Dim res As String
    Dim resb As New StringBuilder
       
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        code = context.Request("CODE")
        opcion = context.Request("opcion")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        cod_vinc_fam = context.Request("cod_vinc_fam")
        
        
        Try
            
            Select Case opcion
                
                
                Case "0"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = motivoBaj.Listar_MotivoBaja(code, String.Empty, String.Empty)
                    Dim dt_copia As New DataTable
                   
                    dt_copia = dt.Clone()
                    
                    
                 
                    Dim filtro As String = "Codigo = '" + code + "'"
                    Dim row() As DataRow = dt.Select(filtro)

                    ' dt_copia.Rows.Add(row(0))
                    dt_copia.ImportRow(row(0))
                    
                    
                    If Not (dt_copia Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt_copia.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""CODE_VINC_FAM"":" & """" & MiDataRow("CODE_VINC_FAM").ToString & """,")
                            resb.Append("""DESC_VINC_FAM"":" & """" & MiDataRow("DESC_VINC_FAM").ToString & """,")
                            resb.Append("""USUA_ID"":" & """" & MiDataRow("usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
                    
                    res = CrearMotivoBajaH(cod_sunat, descripcion, estado, usuario, IIf(cod_vinc_fam.Equals("T"), Nothing, cod_vinc_fam))
                    
                Case "M"
                    res = ActualizarMotivoBajaH(codigo, cod_sunat, descripcion, estado, usuario, IIf(cod_vinc_fam.Equals("T"), Nothing, cod_vinc_fam))
                    
                Case "A"
                    res = CambiarEstadoMotivoBajaH(code)
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
         
            context.Response.Write("error" & ex.ToString)
        End Try
        
 
        
    End Sub
 
    Public Function CrearMotivoBajaH(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, p_CODE_VINC_FAM As String) As String
        
        Dim datos(1) As String
        datos = motivoBaj.Crear_MotivoBaja(p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID, p_CODE_VINC_FAM)
        Return datos(0)
        
    End Function
    
    Public Function ActualizarMotivoBajaH(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, p_CODE_VINC_FAM As String) As String
        
        Dim datos(1) As String
        datos = motivoBaj.Actualizar_MotivoBaja(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID, p_CODE_VINC_FAM)
        Return datos(0)
        
    End Function
    
    Public Function CambiarEstadoMotivoBajaH(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = motivoBaj.CambiarEstado_MotivoBaja(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class