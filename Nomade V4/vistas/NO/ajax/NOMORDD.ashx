<%@ WebHandler Language="VB" Class="NOMORDD" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMORDD : Implements IHttpHandler
    
    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Dim dt As DataTable
    
    
    Dim CTLG_CODE, SCSL_CODE, ALMACENABLE_IND, FECHA_TRANSACCION, p_PLAZO As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        opcion = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ALMACENABLE_IND = context.Request("ALMACENABLE_IND")
        FECHA_TRANSACCION = context.Request("FECHA_TRANSACCION")
        p_PLAZO = context.Request("p_PLAZO")
        
        Try
            Select Case opcion
                Case "1" 'LISTAR PRODUCTOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, SCSL_CODE, If(ALMACENABLE_IND Is Nothing, "S", ALMACENABLE_IND), "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & row("NO_SERIADA").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM").ToString & """,")
                            resb.Append("""DETRACCION"" :" & """" & row("DETRACCION").ToString & """,")
                            resb.Append("""STOCK_REAL"" :" & """" & row("STOCK_REAL").ToString & """,")
                            resb.Append("""CANT_TOTAL"" :" & """" & row("CANT_TOTAL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "FECHAX" ' Suma fecha de emision más plazo de pago
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim datos As String() = FECHA_TRANSACCION.Split(New Char() {"/"})
                    Dim fechaEmision As Date
                    If datos.Length = 3 Then
                        fechaEmision = New Date(datos(2), datos(1), datos(0))
                    Else
                        fechaEmision = Date.Now
                    End If
                    If p_PLAZO = "" Then
                        p_PLAZO = "0"
                    End If
                    Dim fecha As Date = fechaEmision.AddDays(Double.Parse(p_PLAZO))
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""FECHANUEVA"" :" & """" & fecha.ToShortDateString() & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
             
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
    
   

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class