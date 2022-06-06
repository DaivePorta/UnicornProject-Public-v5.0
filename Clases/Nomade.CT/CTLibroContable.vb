Public Class CTLibroContable
    Private cn As Nomade.Connection
    Dim oDT As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarLibroContable(ByVal sCodSunat As String, ByVal sDescripcion As String, ByVal sDescripcionCorta As String,
                                           ByVal sEstado As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarLibroContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodSunat", sCodSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim sCodLibro As String = cmd.Parameters("@p_CodLibro").Value
            Return sCodLibro
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnEditarLibroContable(ByVal sCodLibro As String, ByVal sCodSunat As String, ByVal sDescripcion As String,
                                     ByVal sDescripcionCorta As String, ByVal sEstado As String, ByVal sCodUsuario As String)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EditarLibroContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", sCodLibro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodSunat", sCodSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DescripcionCorta", sDescripcionCorta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListaLibroContable(ByVal sCodLibro As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaLibroContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", IIf(sCodLibro.Equals(""), Nothing, sCodLibro), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnCambiarEstadoLibroContable(ByVal sCodLibro As String, ByVal sCodUsuario As String) As Boolean
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CambiarEstadoLibroContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", sCodLibro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", String.Empty, ParameterDirection.Output, DbType.Boolean))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim bEstado As Boolean = cmd.Parameters("@p_Estado").Value
            Return bEstado
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnExisteCodSunatLibroContable(ByVal sCodLibro As String, ByVal sCodSunat As String) As Boolean
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ExisteCodSunatLibroContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodLibro", IIf(sCodLibro.Equals(""), Nothing, sCodLibro), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodSunat", sCodSunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Existe", String.Empty, ParameterDirection.Output, 253))
            cn.Ejecuta_parms(cmd)
            Dim bExiste As Boolean = cmd.Parameters("@p_Existe").Value
            Return bExiste
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
