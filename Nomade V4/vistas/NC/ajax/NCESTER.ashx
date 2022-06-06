<%@ WebHandler Language="VB" Class="NCESTER" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCESTER : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
       
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCEstereotipo("Bn")
    Dim res As String
    Dim codigo, codrec As String
    Dim resb As New StringBuilder
    Dim p_CODE_ALTERNATIVO, p_CTLG_CODE, p_DESCRIPCION, p_ESTADO_IND, p_USUA_ID, p_DETALLE As String
   
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        
        flag = context.Request("flag")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        Try
            If p_CTLG_CODE = String.Empty Then
                p_CTLG_CODE = Utilities.mGetEmpresa(context)
            End If
        Catch ex As Exception

        End Try
        
        p_CODE_ALTERNATIVO = context.Request("p_CODE_ALTERNATIVO")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = context.User.Identity.Name
        p_DETALLE = context.Request("p_DETALLE")

        Try
            
            Select Case flag.ToString
                
                Case "1"
                    'NO SE USA
                    'res = CrearEstereotipo(p_CODE_ALTERNATIVO, p_CTLG_CODE, p_DESCRIPCION, p_ESTADO_IND, p_USUA_ID)
                    
                Case "2"
                    
                    res = ActualizarEstereotipo(p_DETALLE, p_USUA_ID)

                Case "3"

                    Dim NCEstereotipo As New Nomade.NC.NCEstereotipo("Bn")
                    dt = NCEstereotipo.ListarEstereotipo(p_CTLG_CODE, Nothing, Nothing)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.Datatable2Json(dt)
                    End If
                Case "C"
                 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    ' dt = p.ListarEstereotipo(codrec)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                        resb.Append("""CLIE"" :" & """" & dt.Rows(0)("CLIENTE") & """,")
                        resb.Append("""PROV"" :" & """" & dt.Rows(0)("PROVEEDOR") & """,")
                        resb.Append("""EMPL"" :" & """" & dt.Rows(0)("EMPLEADO") & """,")
                        resb.Append("""AFP"" :" & """" & dt.Rows(0)("AFP") & """,")
                        resb.Append("""BANC"" :" & """" & dt.Rows(0)("BANCO") & """,")
                        resb.Append("""EPS"" :" & """" & dt.Rows(0)("EPS") & """,")
                        resb.Append("""ACCI"" :" & """" & dt.Rows(0)("ACCIONISTA") & """,")
                        resb.Append("""TRAN"" :" & """" & dt.Rows(0)("TRANSPORTISTA") & """,")
                        resb.Append("""CHOF"" :" & """" & dt.Rows(0)("CHOFER") & """,")
                        resb.Append("""PROP"" :" & """" & dt.Rows(0)("PROPIETARIO") & """,")
                        resb.Append("""ASEG"" :" & """" & dt.Rows(0)("ASEGURADORA") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "error"
                    End If
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
                
        
        
        
    End Sub
 
    Public Function CrearEstereotipo(ByVal p_CODE_ALTERNATIVO As String,
                                     ByVal p_CTLG_CODE As String,
                                     ByVal p_DESCRIPCION As String,
                                     ByVal p_ESTADO_IND As String,
                                     ByVal p_USUA_ID As String) As String
        Dim datos As String
        
        datos = p.CrearEstereotipo(p_CODE_ALTERNATIVO, p_CTLG_CODE, p_DESCRIPCION, p_ESTADO_IND, p_USUA_ID)
              
        Return datos
       
    End Function
    
    

    
    
    Public Function ActualizarEstereotipo(ByVal p_DETALLE As String, ByVal p_USUA_ID As String) As String
        Dim datos As String
        
        datos = p.ActualizarEstereotipo(p_DETALLE, p_USUA_ID)
        
        Return datos
        
    End Function
        

    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class