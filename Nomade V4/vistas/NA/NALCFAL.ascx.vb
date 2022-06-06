Imports System.Data
Partial Class vistas_NA_NALCFAL
    Inherits NOMADE.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            Dim p As New Nomade.NA.NAConfAlmacenes("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = p.ListarAlmacenes(String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("EMPRESA").ToString & """,""CODIGO"":""" & row("CODE_EMPRESA").ToString & """},")
                    sb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""TIPO_ALMACEN"":""" & row("NTIPO_ALMACEN").ToString & """,")
                    sb.Append("""ENCARGADO_ALMACEN"":""" & row("ENCARGADO_ALMACEN").ToString & """,")
                    sb.Append("""DIRECCION"":""" & row("DIRECCION").ToString & """,")
                    sb.Append("""PAIS"":""" & row("PAIS").ToString & """,")
                    sb.Append("""UBIGEO"":""" & row("UBIGEO").ToString & """,")
                    sb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
                    sb.Append("""ANEXO"":""" & row("ANEXO").ToString & """,")
                    sb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
                    sb.Append("""FECHA_TERMINO"":""" & row("FECHA_TERMINO").ToString & """,")
                    sb.Append("""DEPARTAMENTO"":""" & row("DEPARTAMENTO").ToString & """,")
                    sb.Append("""PROVINCIA"":""" & row("PROVINCIA").ToString & """,")
                    sb.Append("""DISTRITO"":""" & row("DISTRITO").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            Me.hfObjAlmacenes.Value = sb.ToString()
            p = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try

    End Sub
End Class
