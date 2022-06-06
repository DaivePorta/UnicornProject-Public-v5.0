<%@ WebHandler Language="VB" Class="NCMREPE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMREPE : Implements IHttpHandler
    
    
    Dim dt As DataTable
    Dim Regimen As New Nomade.NC.NCRegimenPen("Bn")
    
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim code As String
    
    Dim opcion, codigo, cod_sunat, pension, estado, fecha_ini, fecha_fin, usuario, tip, Pdim, p_FCOSIPE_CTLG_CODE As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        pension = context.Request("pension")
        estado = context.Request("estado")
        fecha_ini = context.Request("fecha_ini")
        fecha_fin = context.Request("fecha_fin")
        usuario = context.Request("usuario")
        tip = context.Request("tipo")
        Pdim = context.Request("PDIM")
        p_FCOSIPE_CTLG_CODE = context.Request("emp")
        Dim P As New Nomade.NC.NCEps("Bn")
        Try
            Select Case opcion
                
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                
                    dt = Regimen.ListarRegimenP(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""FECHA_INI"" :" & """" & MiDataRow("fecha_ini").ToString & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("fecha_fin").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """,")
                            resb.Append("""PDIM"" :" & """" & MiDataRow("PDIM").ToString & """,")
                            resb.Append("""TIP"" :" & """" & MiDataRow("TIP").ToString & """,")
                            resb.Append("""PERSONA"" :" & """" & MiDataRow("Persona").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
                    
                    If Not fecha_fin.Equals(String.Empty) Then
                        fecha_fin = Utilities.fechaLocal(fecha_fin)
                    End If
                    
                    res = CrearRegimenPen(cod_sunat, pension, Utilities.fechaLocal(fecha_ini), fecha_fin, estado, usuario, tip, Pdim, p_FCOSIPE_CTLG_CODE)
                    
                                       
                Case "M"
                    If Not fecha_fin.Equals(String.Empty) Then
                        fecha_fin = Utilities.fechaLocal(fecha_fin)
                    End If
                    
                    res = ActualizarRegimenPen(codigo, cod_sunat, pension, Utilities.fechaLocal(fecha_ini), fecha_fin, estado, usuario,tip,Pdim)
                    
                Case "A"
                    Dim arreglo(1) As String
                    
                    arreglo = CambiarEstadoRegimenPen(code)
                    res = arreglo(0) & "," & arreglo(1)
                Case "P"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = P.ListarEps(codigo, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("codigo") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("fecha_ini") & """,")
                    resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("fecha_fin") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("codigo_sunat") & """,")
                    resb.Append("""PIDM"" :" & """" & dt.Rows(0)("pidm") & """,")
                    resb.Append("""RUC"" :" & """" & dt.Rows(0)("RUC") & """,")
                    resb.Append("""EPS"" :" & """" & dt.Rows(0)("EPS") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
                      
    End Sub
 
    Public Function CrearRegimenPen(ByVal p_COD_SUNAT As String, ByVal p_DESC As String, ByVal p_F_INICIO As String,
                                    ByVal p_F_FIN As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, ByVal p_Tip As String, ByVal p_Pdim As String, ByVal p_FCOSIPE_CTLG_CODE As String) As String
        Dim datos(1) As String
        datos = Regimen.Crear_RegimenP(p_COD_SUNAT, p_DESC, p_F_INICIO, p_F_FIN, p_ESTADO_ID, p_USUA_ID, p_Tip, p_Pdim, p_FCOSIPE_CTLG_CODE)
        Regimen = Nothing
        Return datos(0)
        
    End Function
    
    Public Function ActualizarRegimenPen(ByVal p_COD As String, ByVal p_COD_SUNAT As String, ByVal p_DESC As String,
                                         ByVal p_F_INICIO As String, ByVal p_F_FIN As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, ByVal p_Tip As String, ByVal p_Pdim As String) As String
        Dim datos(1) As String
        datos = Regimen.Actualizar_RegimenP(p_COD, p_COD_SUNAT, p_DESC, p_F_INICIO, p_F_FIN, p_ESTADO_ID, p_USUA_ID, p_Tip, p_Pdim)
        Regimen = Nothing
        Return datos(0)
        
    End Function
     
    Public Function CambiarEstadoRegimenPen(ByVal p_CODE As String) As Array
       
        Dim datos(1) As String
        
        datos = Regimen.CambiarEstado_RegimenP(p_CODE)
        
        Return datos
     
    End Function
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class