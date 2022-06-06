<%@ WebHandler Language="VB" Class="NCMCUCO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCUCO : Implements IHttpHandler
   
    Dim OPCION As String
    
    Dim CODE, CODIGO_SUNAT, TIPL_CODE, CLASE_CUENTA, NOMBRE_CORTO, ESTADO_IND, USUA_ID As String
    
    Dim dt As DataTable

    Dim p As New Nomade.NC.NCTipoPlan("Bn")
    Dim q As New Nomade.NC.NCClaseCuentaContable("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        CODE = context.Request("CODE")
        CODIGO_SUNAT = context.Request("CODIGO_SUNAT")
        TIPL_CODE = context.Request("TIPL_CODE")
        CLASE_CUENTA = context.Request("CLASE_CUENTA")
        NOMBRE_CORTO = context.Request("NOMBRE_CORTO")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
                
        Try
            Select Case OPCION.ToString()
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_TipoPlan(String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_ClaseCuentaContable(CODE, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""TIPL_CODE"" :" & """" & MiDataRow("TIPL_CODE").ToString & """,")
                            resb.Append("""NTIPL_CODE"" :" & """" & MiDataRow("NCTIPL_CODE").ToString & """,")
                            resb.Append("""CLASE_CUENTA"" :" & """" & MiDataRow("CLASE_CUENTA").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                            resb.Append("""CODE_PL"" :" & """" & MiDataRow("CODE_PL").ToString & """,")
                            resb.Append("""NESTADO_IND"" :" & """" & MiDataRow("NESTADO_IND").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"
                    
                Case "N"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = GrabarClaseCuentaContable(CODIGO_SUNAT, TIPL_CODE, CLASE_CUENTA, NOMBRE_CORTO, ESTADO_IND, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "M"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = ActualizarClaseCuentaContable(CODE, CODIGO_SUNAT, TIPL_CODE, CLASE_CUENTA, NOMBRE_CORTO, ESTADO_IND, USUA_ID)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "RO"
                    res = CambiarEstadoContable(CODE)
                    
                Case Else
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

    
    Public Function GrabarClaseCuentaContable(ByVal p_PTVCUCO_CODIGO_SUNAT As String, ByVal p_PTVCUCO_TIPL_CODE As String, ByVal p_PTVCUCO_CLASE_CUENTA As String, ByVal p_PTVCUCO_NOMBRE_CORTO As String, ByVal p_PTVCUCO_ESTADO_IND As String, ByVal p_PTVCUCO_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = q.Crear_ClaseCuentaContable(p_PTVCUCO_CODIGO_SUNAT, p_PTVCUCO_TIPL_CODE, p_PTVCUCO_CLASE_CUENTA, p_PTVCUCO_NOMBRE_CORTO, p_PTVCUCO_ESTADO_IND, p_PTVCUCO_USUA_ID)
        Return datos
    End Function

    Public Function ActualizarClaseCuentaContable(ByVal p_PTVCUCO_CODE As String, ByVal p_PTVCUCO_CODIGO_SUNAT As String, ByVal p_PTVCUCO_TIPL_CODE As String, ByVal p_PTVCUCO_CLASE_CUENTA As String, ByVal p_PTVCUCO_NOMBRE_CORTO As String, ByVal p_PTVCUCO_ESTADO_IND As String, ByVal p_PTVCUCO_USUA_ID As String) As Array
        Dim datos(2) As String
        datos = q.Actualizar_ClaseCuentaContable(p_PTVCUCO_CODE, p_PTVCUCO_CODIGO_SUNAT, p_PTVCUCO_TIPL_CODE, p_PTVCUCO_CLASE_CUENTA, p_PTVCUCO_NOMBRE_CORTO, p_PTVCUCO_ESTADO_IND, p_PTVCUCO_USUA_ID)
        Return datos
    End Function
    Public Function CambiarEstadoContable(ByVal p_CODE As String) As String
        
        Dim datos As String
        
        datos = q.CambiarEstado_Contable(p_CODE)
        
        
        Return datos
        
    End Function
    
    
    
   
End Class