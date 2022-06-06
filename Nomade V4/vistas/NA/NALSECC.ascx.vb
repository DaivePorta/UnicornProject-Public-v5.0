Imports System.Data

Partial Class vistas_NA_NALSECC
    Inherits Nomade.N.Cub



    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            Dim p As New Nomade.NA.NASeccionesAlmacen("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = p.ListarSeccionAlmacen(String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("EMPRESA").ToString & """,""CODIGO"":""" & row("CODIGO_EMPRESA").ToString & """},")
                    sb.Append("""ALMACEN"":{""NOMBRE"":""" & row("ALMACEN").ToString & """,""CODIGO"":""" & row("CODIGO_ALMACEN").ToString & """},")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                  
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            Me.hfObjSeccAlmacenes.Value = sb.ToString()
            p = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try

    End Sub

End Class
