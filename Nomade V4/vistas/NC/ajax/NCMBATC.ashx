<%@ WebHandler Language="VB" Class="NCMBATC" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NCMBATC : Implements IHttpHandler

    Dim res As String
    Dim resb As New StringBuilder
    Dim opcion As String
    Dim dt As DataTable
    Dim dt1 As DataTable
    Dim p As New Nomade.NC.NCBatch("BN")
    
    Dim v_NombreProceso As String
    Dim v_NombreProcedure As String
    Dim v_TipoProceso As String
    Dim v_TipoEjecucion As String
    Dim v_Estado As String
    Dim v_Observacion As String
    Dim v_Nivel As String
    Dim v_CodPadre As String
    Dim sJson As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        opcion = context.Request("opcion")
        v_NombreProceso = context.Request("NombreProceso")
        v_NombreProcedure = context.Request("NombreProcedure")
        v_TipoProceso = context.Request("TipoProceso")
        v_TipoEjecucion = context.Request("TipoEjecucion")
        v_Estado = context.Request("Estado")
        v_Observacion = context.Request("Observacion")
        v_Nivel = context.Request("Nivel")
        v_CodPadre = context.Request("CodPadre")
        
        Try
            Select Case opcion
                Case "1"
                    dt = p.fListarTpoProceso
                    context.Response.ContentType = "application/json; charset=utf-8"
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""codigo"" :" & """" & MiDataRow("codigo").ToString & """,")
                            resb.Append("""descripcion"" :" & """" & MiDataRow("descripcion").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    dt = p.fListarTpoEjecucion
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""codigo"" :" & """" & MiDataRow("codigo").ToString & """,")
                            resb.Append("""descripcion"" :" & """" & MiDataRow("descripcion").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3"
                    dt = p.fListaProcesoRef
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""codigo"" :" & """" & MiDataRow("codigo").ToString & """,")
                            resb.Append("""descripcion"" :" & """" & MiDataRow("descripcion").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    dt = p.fListarProcedimientos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""db"" :" & """" & MiDataRow("db").ToString & """,")
                            resb.Append("""name"" :" & """" & MiDataRow("name").ToString & """,")
                            resb.Append("""definer"" :" & """" & MiDataRow("definer").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "5"
                    context.Response.ContentType = "text/plain"
                    res = p.fGrabarCierre(v_NombreProceso, v_NombreProcedure, _
                                        v_TipoProceso, v_TipoEjecucion, v_Estado, v_Observacion, v_Nivel, v_CodPadre)
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListarProcesos_Nivel1
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""codproceso"" :" & """" & MiDataRow("codproceso").ToString & """,")
                            resb.Append("""nombreproceso"" :" & """" & MiDataRow("nombreproceso").ToString & """,")
                            resb.Append("""nombreprocedure"" :" & """" & MiDataRow("nombreprocedure").ToString & """,")
                            resb.Append("""nivel"" :" & """" & MiDataRow("nivel").ToString & """,")
                            resb.Append("""codpadre"" :" & """" & MiDataRow("codpadre").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        
                            'obteniendo data hijo
                            sJson = fListarHijos(MiDataRow("nivel").ToString, MiDataRow("codproceso").ToString)
                            If sJson.Trim.Length > 0 Then
                                resb.Append(sJson)
                            End If
                            
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
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
    
    
    Private Function fListarHijos(ByVal pNivel As String, ByVal pCodProceso As Integer) As String
        Dim sJson As String = String.Empty
        Dim resb1 As New StringBuilder
        Dim resb2 As New StringBuilder
        Try
            dt1 = p.fListarProceso_Child(Convert.ToInt32(pNivel) + 1, pCodProceso)
            
            If Not dt1 Is Nothing Then
                For Each nrow As DataRow In dt1.Rows
                    resb1 = New StringBuilder
                    resb1.Append("{")
                    resb1.Append("""codproceso"" :" & """" & nrow("codproceso").ToString & """,")
                    resb1.Append("""nombreproceso"" :" & """" & nrow("nombreproceso").ToString & """,")
                    resb1.Append("""nombreprocedure"" :" & """" & nrow("nombreprocedure").ToString & """,")
                    resb1.Append("""nivel"" :" & """" & nrow("nivel").ToString & """,")
                    resb1.Append("""codpadre"" :" & """" & nrow("codpadre").ToString & """")
                    resb1.Append("}")
                    resb1.Append(",")
                            
                    resb2.Append(resb1)
                    
                    sJson = fListarHijos(nrow("nivel").ToString, nrow("codproceso").ToString)
                    
                    If sJson.Trim.Length > 0 Then
                        resb2.Append(sJson)
                    End If
                Next
            Else
                sJson = resb2.ToString
                Return sJson
            End If
            sJson = resb2.ToString
            Return sJson
        Catch ex As Exception
            Throw ex
        End Try
    End Function
    
End Class