<%@ WebHandler Language="VB" Class="NFMMOBU" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMMOBU : Implements IHttpHandler
    Dim flag As String
    Dim res As String
    Dim res2 As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim codigo As String
    Dim user As String
    Dim acti As String
    Dim nomb As String
    Dim marc As String
    Dim psec As String
    Dim pbru As String
    Dim nasi As String
    Dim carr, largo, ancho, alto As String
    Dim ejes As String
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        acti = context.Request("acti")
        nomb = context.Request("nomb")
        user = context.Request("user")
        marc = context.Request("marc")
        psec = context.Request("psec")
        pbru = context.Request("pbru")
        nasi = context.Request("nasi")
        carr = context.Request("carr")
        codigo = context.Request("codigo")
        largo = context.Request("larg")
        ancho = context.Request("anch")
        alto = context.Request("alto")
        ejes = context.Request("ejes")
               
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    Dim array As Array
                    array = p.CrearModelo(nomb, marc, psec, pbru, nasi, carr, acti, user, largo, ancho, alto, ejes)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "2"
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    Dim array As Array
                    array = p.ActualizarModelo(codigo, nomb, marc, psec, pbru, nasi, carr, acti, user, largo, ancho, alto, ejes)
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "3"
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    res = p.CambiarEstadoModelo(codigo) 'cambiar estado Inactivo/Activo                                                      
                    
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    dt = p.ListarModelo(codigo, String.Empty, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""MODELO"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                    resb.Append("""PESO_SECO"" :" & """" & dt.Rows(0)("PESO_SECO").ToString().Replace(",", ".") & """,")
                    resb.Append("""PESO_BRUTO"" :" & """" & dt.Rows(0)("PESO_BRUTO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ASIENTOS"" :" & """" & dt.Rows(0)("ASIENTOS") & """,")
                    resb.Append("""CARROCERIA"" :" & """" & dt.Rows(0)("CARROCERIA") & """,")
                    resb.Append("""CODIGO_MARCA"" :" & """" & dt.Rows(0)("CODIGO_MARCA") & """,")
                    resb.Append("""NRO_EJES"" :" & """" & dt.Rows(0)("NRO_EJES") & """,")
                    resb.Append("""LARGO"" :" & """" & dt.Rows(0)("LARGO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ANCHO"" :" & """" & dt.Rows(0)("ANCHO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ALTO"" :" & """" & dt.Rows(0)("ALTO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """")
   
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "5"
           
                    Dim p As New Nomade.NF.NFMarcaUnidad("BN")
                    dt = p.ListarMarcaUnidad(String.Empty, String.Empty, "A")
                    res = String.Empty
                    If Not dt Is Nothing Then
                        For i As Integer = 0 To dt.Rows.Count - 1
                            res += dt.Rows(i)("descripcion")
                            res2 += dt.Rows(i)("codigo")
                            If i < dt.Rows.Count - 1 Then
                                res += ","
                                res2 += ","
                            End If
                            
                        Next
                        res += "|" + res2
                    Else : res = "error"
                    End If
                    
                    
                    
                Case "6"
                    Dim p As New Nomade.NF.NFCarroceriaUnidad("BN")
                    dt = p.ListarCarroceriaUnidad(String.Empty, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "carroceria", "CARROCERIA")
                    
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
            res = "<option>Sin Datos</option>"
        End If
        Return res
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class