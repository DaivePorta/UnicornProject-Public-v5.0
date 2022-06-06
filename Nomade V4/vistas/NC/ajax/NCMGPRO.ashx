<%@ WebHandler Language="VB" Class="NCMGPRO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMGPRO : Implements IHttpHandler
    Dim OPCION As String
    Dim NOMBRE, ESTADO_IND, USUA_ID, CODE, CTLG_CODE, GRUP_CODE, PIDM, DESCRIPCION, TIPO As String
    
    Dim dt As DataTable
    Dim NCEProveedor As New Nomade.NC.NCEProveedor("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        CODE = context.Request("CODE")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        CTLG_CODE = context.Request("CTLG_CODE")
        GRUP_CODE = context.Request("GRUP_CODE")
        PIDM = context.Request("PIDM")
        DESCRIPCION = context.Request("DESCRIPCION")
        NOMBRE = context.Request("NOMBRE")
        TIPO = context.Request("TIPO")

        Select Case OPCION
                
            Case "1" ' lista proveedores
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NCEProveedor.ListarProveedor("0", ESTADO_IND, CTLG_CODE, "", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"":" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""RAZON_SOCIAL"":" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")

                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
            Case "3" ' lista proveedores
                 context.Response.ContentType = "application/json; charset=utf-8"
                dt = NCEProveedor.Listar_Proveedor_Grupo(GRUP_CODE, "", "NORMAL")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"":" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
                        resb.Append("""NESTADO"":" & """" & MiDataRow("NESTADO").ToString & """")

                        
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                        
                End If
                res = resb.ToString()
           
            Case "AP" 'AGREGAR PROVEEDOR GRUPO
                context.Response.ContentType = "text/html"
                res = Add_Proveedor_Grupo(GRUP_CODE, PIDM)
            Case "CR" 'CREAR GRUPO PROVEEDOR
                context.Response.ContentType = "text/html"
                res = Crear_Grupo_Proveedor(NOMBRE, DESCRIPCION, ESTADO_IND, USUA_ID)
            Case "2" 'LISTA LOS PROVEEDORES AGREGADOS EN EL GRUPO
                context.Response.ContentType = "text/html"
                res = Listar_Proveedor_Grupo(GRUP_CODE)
            Case "8" ' lista proveedores
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NCEProveedor.Listar_Proveedor_Grupo(GRUP_CODE, "A", "DETALLE")
             
                If Not (dt Is Nothing) Then
                 
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
              
            Case "AT" 'ACTUALIZA TIPO REGIMEN
                context.Response.ContentType = "text/html"
                res = Actualizar_Grupo_Proveedor(NOMBRE, DESCRIPCION, ESTADO_IND, USUA_ID, TIPO, GRUP_CODE, PIDM)
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    Public Function Add_Proveedor_Grupo(ByVal p_grup_code As String, ByVal p_pidm As String) As String
       
        Dim Datos As String
        Datos = NCEProveedor.Agregar_Proveedor_Grupo(p_grup_code, p_pidm)
        Return Datos
    
    End Function
    
    Public Function Crear_Grupo_Proveedor(ByVal p_nombre As String, ByVal p_descripcion As String, ByVal p_est_ind As String, ByVal p_usua_id As String) As String
       
        Dim Datos As String
        Datos = NCEProveedor.Crear_Grupo_Proveedor(p_nombre, p_descripcion, p_est_ind, p_usua_id)
        Return Datos
    
    End Function
    
    Public Function Actualizar_Grupo_Proveedor(ByVal p_nombre As String, ByVal p_descripcion As String, _
                                               ByVal p_est_ind As String, ByVal p_usua_id As String, _
                                               ByVal p_tipo As String, ByVal p_grup_code As String, _
                                               ByVal p_pidm As String) As String
    
        Dim Datos As String
        Datos = NCEProveedor.Actualizar_Grupo_Proveedor(p_nombre, p_descripcion, p_est_ind, p_usua_id, p_tipo, p_grup_code, p_pidm)
        Return Datos
        
    End Function
    
    Public Function Listar_Proveedor_Grupo(ByVal grup_code As String) As String
        

        Dim rsb As New StringBuilder
        rsb.Clear()
        
        dt = NCEProveedor.Listar_Proveedor_Grupo(grup_code, "A", "DETALLE")
        If Not (dt Is Nothing) Then
            rsb.Append("[")
            For Each MiDataRow As DataRow In dt.Rows
                rsb.Append("{")
                rsb.Append("""PIDM"":" & """" & MiDataRow("PIDM").ToString & """,")
                rsb.Append("""CODIGO_GRUPO"":" & """" & MiDataRow("CODIGO_GRUPO").ToString & """,")
                rsb.Append("""TIPO_DCTO"":" & """" & "D.N.I<br>R.U.C" & """,")
                rsb.Append("""NRO_DCTO"":" & """" & IIf(MiDataRow("DNI").ToString.Equals(""), "-", MiDataRow("DNI").ToString) & "<br>" & MiDataRow("RUC").ToString & """,")
                rsb.Append("""RAZON_SOCIAL"":" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                rsb.Append("""CORREO"":" & """" & MiDataRow("CORREO").ToString & """,")
                rsb.Append("""SEQ"":" & """" & MiDataRow("SEQ").ToString & """")

                        
                rsb.Append("}")
                rsb.Append(",")
            Next
            rsb.Append("{}")
            rsb = rsb.Replace(",{}", String.Empty)
            rsb.Append("]")
                        
        End If
                        
  
        Return rsb.ToString()
         
        
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class